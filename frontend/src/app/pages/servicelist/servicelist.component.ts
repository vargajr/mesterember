import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { Service } from 'src/app/models/service';
import { MessageService } from 'src/app/services/message.service';
import { ServiceService } from 'src/app/services/service.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-servicelist',
  templateUrl: './servicelist.component.html',
  styleUrls: ['./servicelist.component.scss']
})
export class ServicelistComponent implements OnInit {

  dataSource: MatTableDataSource<Service> = new MatTableDataSource<Service>();
  dataSource$: Observable<any> = this.servicesService.watcher$.pipe(
    switchMap(list => {
      const modList = (list as Service[]).map(service => ({
        ...service,
        contactinfo: service.contacts ? `${service.contacts['webpageUrl']}` : '',
      }));
      return of(modList);
    })
  );

  displayedColumns = [
    "name",
    "type",
    "description",
    "contactinfo",
    "active",
    "actions",
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
      services => this.dataSource.data = (services as unknown as Service[])
    );
    this.servicesService.refresh();

    this.dataSource.filterPredicate = (data: Service, filter: string) => {
      const key = this.currentFilterKey || '';
      const source = key ? String((data as any)[key]) : JSON.stringify(data);
      return source.toLowerCase().includes(filter.toLowerCase());
    }
  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
  }

  onEdit(service: Service): void {
    this.router.navigate(['/', 'services', 'edit', service._id]);
  }

  onDetails(service: Service): void {
    this.router.navigate(['/', 'services', 'details', service._id]);
  }

  onDelete(service: Service): void {
    const dialogData = {
      title: 'Törlés megerősítése',
      content: 'A szolgáltatás adatai véglegesen tötölve lesznek.',
      template: this.dialogTemplate,
    }
    this.messageService.openDialog(dialogData).pipe(
      take(1)
    ).subscribe(
      result => {
        if (!result) {
          return;
        }
        this.servicesService.remove(String(service._id)).toPromise().then(
          response => this.messageService.openSnackBar(
            3500,
            `${response.name} was deleted.`
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
}
