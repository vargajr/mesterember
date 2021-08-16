import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Service, ServiceUpload } from '../models/service';
import { BaseService } from './base.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService extends BaseService<Service> {

  constructor(
    public config: ConfigService,
    public http: HttpClient,
  ) {
    super(config, http);
    this.entity = 'services';
  }

  update(id: number | string, data: any): Observable<Service> {
    const url = `${this.config.apiUrl}${this.entity}/${id}`;
    return this.http.patch<any>(url, data);
  }

  create(document:any): Observable<Service> {
    const url = `${this.config.apiUrl}${this.entity}`;
    return this.http.post<any>(url, document);
  }

}
