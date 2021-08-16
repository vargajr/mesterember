import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

interface IPicker {
  user: User;
}

@Component({
  selector: 'app-userpicker',
  templateUrl: './userpicker.component.html',
  styleUrls: ['./userpicker.component.scss']
})
export class UserpickerComponent implements OnInit, OnDestroy {

  userList$: Observable<any> = this.userService.watcher$
  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>();

  displayedColumns = [
    "_id",
    "firstName",
    "lastName",
    "email",
    "actions"
  ];
  pageSizes: number[] = [3, 6];
  dataSubscription: Subscription = new Subscription();
  currentFilterKey: string = '';

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator | any;

  constructor(
    private userService: UserService,
    public dialogRef: MatDialogRef<UserpickerComponent>,
    @Inject(MAT_DIALOG_DATA) public user: IPicker,
  ) { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSubscription = this.userService.watcher$.subscribe(
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

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
