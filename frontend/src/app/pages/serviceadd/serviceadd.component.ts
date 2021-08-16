import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { Editable, Service, ServiceUpload } from 'src/app/models/service';
import { User } from 'src/app/models/user';
import { MessageService } from 'src/app/services/message.service';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-serviceadd',
  templateUrl: './serviceadd.component.html',
  styleUrls: ['./serviceadd.component.scss']
})
export class ServiceaddComponent implements OnInit {

  service$: Observable<Editable> = new Observable();
  uploader$: BehaviorSubject<User> = new BehaviorSubject(new User() as User);
  emptyUser = new User();

  constructor(
    private servicesService: ServiceService,
    private ar: ActivatedRoute,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.service$ = this.ar.params.pipe(
      switchMap( par => (this.servicesService.get(par.id) as Observable<Service>)),
      switchMap(service => {
        const editableFormat: Editable = {...service};
        editableFormat.city = service.contacts?.addr?.city || '';
        editableFormat.street = service.contacts?.addr?.street || '';
        editableFormat.houseNumber = service.contacts?.addr?.houseNumber || '';
        editableFormat.contactPerson= service.contacts?.contactPerson || '';
        editableFormat.available= service.contacts?.available || '';
        editableFormat.phone= service.contacts?.tel || '';
        editableFormat.email= service.contacts?.email || '';
        editableFormat.webpageUrl= service.contacts?.webpageUrl || '';
        editableFormat.recommender = `${service.uploader?.firstName} ${service.uploader?.lastName}`;
        this.uploader$.next(service.uploader as User);
        return of(editableFormat)
      })
    );
  }

  onPickUser(user: User): void {
    this.messageService.openUserPicker(user).pipe(
      take(1)
    ).subscribe(
      pickedUser => {
        if (!pickedUser) {
          return;
        }
        this.uploader$.next(pickedUser);
      }
    )
  }

  async onSubmit(ngForm: NgForm, data: Editable): Promise<any> {
    const edited = new ServiceUpload();
    edited.name = ngForm.value.name;
    edited.type = ngForm.value.type;
    edited.description = ngForm.value.description;
    const { city, street, houseNumber } = ngForm.value;
    const addressObject = { city, street, houseNumber };
    const { contactPerson, available, tel, email, webpageUrl } = ngForm.value;
    const contactObject = { contactPerson, available, tel, email, webpageUrl };
    edited.contacts = contactObject;
    edited.contacts.addr = addressObject;
    edited.active = ngForm.value.active;
    edited.uploader = this.uploader$.value._id;
    await this.servicesService.update(String(edited._id), edited).toPromise()
    return history.back();
  }

}
