import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { DialogComponent } from '../common/dialog/dialog.component';
import { UserpickerComponent } from '../common/userpicker/userpicker.component';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) { }

  openDialog(data: any): Observable<any> {
    const dialogRef = this.dialog.open(DialogComponent,{
      width: '250px',
      data,
    });

    return dialogRef.afterClosed();
  }

  openUserPicker(data: any): Observable<any> {
    const dialogRef = this.dialog.open(UserpickerComponent,{
      width: '750px',
      data,
    });

    return dialogRef.afterClosed();
  }

  openSnackBar(duration: number, message?: string): void {
    this.snackBar.open(message || '', 'Ok', {duration});
  }
}
