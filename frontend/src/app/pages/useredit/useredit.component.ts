import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User, Editable } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-useredit',
  templateUrl: './useredit.component.html',
  styleUrls: ['./useredit.component.scss']
})
export class UsereditComponent implements OnInit {

  user$: Observable<Editable> = new Observable();
  roles: string[] = ['user', 'editor', 'admin'];

  constructor(
    private userService: UserService,
    private ar: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.user$ = this.ar.params.pipe(
      switchMap( par => (this.userService.get(par.id) as Observable<User>)),
      switchMap(user => {
        const editableFormat: Editable = {...user};
        editableFormat.city = user.addr?.city || '';
        editableFormat.street = user.addr?.street || '';
        editableFormat.houseNumber = user.addr?.houseNumber || '';
        return of(editableFormat)
      })
    );
  }

  async onSubmit(ngForm: NgForm, data: Editable): Promise<any> {
    const edited = new User();
    edited._id = data._id;
    edited.firstName = ngForm.value.firstName;
    edited.lastName = ngForm.value.lastName;
    edited.email = ngForm.value.email;
    edited.password = ngForm.value.password;
    edited.active = ngForm.value.active;
    edited.postList = data.postList;
    edited.role = ngForm.value.role;
    const { city, street, houseNumber } = ngForm.value;
    edited.addr = { city, street, houseNumber };
    await this.userService.update(String(edited._id), edited).toPromise();
    return history.back();
  }

}
