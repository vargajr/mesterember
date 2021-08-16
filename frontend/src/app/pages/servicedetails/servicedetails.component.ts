import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Editable, Service } from 'src/app/models/service';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-servicedetails',
  templateUrl: './servicedetails.component.html',
  styleUrls: ['./servicedetails.component.scss']
})
export class ServicedetailsComponent implements OnInit {

  service$: Observable<Editable> = new Observable();

  constructor(
    private servicesService: ServiceService,
    private ar: ActivatedRoute,
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
        editableFormat.recommender = `${service.uploader?.firstName} ${service.uploader?.lastName}`
        return of(editableFormat)
      })
    );
  }

}
