import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { MessageService } from 'src/app/services/message.service';
import { ServiceService } from 'src/app/services/service.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit, OnDestroy {

  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>();
  dataSource$: Observable<any> = this.userService.watcher$.pipe(
    switchMap(list => {
      const modList = (list as User[]).map(person => ({
        ...person,
        address: person.addr ? `${person.addr['city']} ${person.addr?.street} ${person.addr?.houseNumber}` : '',
        posts: person.postList?.length || 0,
      }));
      return of(modList);
    })
  );

  displayedColumns = [
    "_id",
    "firstName",
    "lastName",
    "email",
    "address",
    "active",
    "role",
    "posts",
    "actions"
  ];
  pageSizes: number[] = [5, 10, 25, 50];
  dataSubscription: Subscription = new Subscription();
  currentFilterKey: string = '';

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator | any;
  @ViewChild('dialogTemplate') dialogTemplate: TemplateRef<any> | any;

  constructor(
    private userService: UserService,
    private servicesService: ServiceService,
    private router: Router,
    private messageService: MessageService,
  ) { }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSubscription = this.dataSource$.subscribe(
      users => this.dataSource.data = (users as unknown as User[])
    );
    this.userService.refresh();

    this.dataSource.filterPredicate = (data: User, filter: string) => {
      const key = this.currentFilterKey || '';
      const source = key ? String((data as any)[key]) : JSON.stringify(data);
      return source.toLowerCase().includes(filter.toLowerCase());
    }
  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
  }

  onEdit(user: User): void {
    this.router.navigate(['/', 'users', 'edit', user._id]);
  }

  onDelete(user: User): void {
    const dialogData = {
      title: 'Törlés megerősítése',
      content: 'A felhsználó adatai és az általa létrehozott bejegyzések is tötölve lesznek.',
      template: this.dialogTemplate,
    }
    this.messageService.openDialog(dialogData).pipe(
      take(1)
    ).subscribe(
      result => {
        if (!result) {
          return;
        }
        this.servicesService.removeManyById(user.postList).toPromise().then(
          result => {
            this.userService.remove(String(user._id)).toPromise().then(
              response => this.messageService.openSnackBar(
                3500,
                `${response.firstName} ${response.lastName} was deleted.`
              ),
              err => this.messageService.openSnackBar(
                3500,
                err.message
              )
            );
          },
          err => this.messageService.openSnackBar(
            3500,
            err.message
          )
        )
      }
    )
    
  }
}
