import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Editable, User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-useradd',
  templateUrl: './useradd.component.html',
  styleUrls: ['./useradd.component.scss']
})
export class UseraddComponent implements OnInit {

  editableuser: Editable = new Editable();
  roles: string[] = ['user', 'editor', 'admin'];

  constructor(
    private userService: UserService,
    private ar: ActivatedRoute,
  ) { }

  ngOnInit(): void {
  }

  async onSubmit(ngForm: NgForm, data: Editable): Promise<any> {
    const edited = new User();
    edited.firstName = ngForm.value.firstName;
    edited.lastName = ngForm.value.lastName;
    edited.email = ngForm.value.email;
    edited.password = ngForm.value.password;
    edited.active = data.active;
    edited.postList = data.postList;
    edited.role = ngForm.value.role;
    const { city, street, houseNumber } = ngForm.value;
    edited.addr = { city, street, houseNumber };
    await this.userService.create(edited).toPromise();
    return history.back();
  }

}
