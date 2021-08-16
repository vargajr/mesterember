import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class BaseService<T> {

  entity: string = "";
  watcher$: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);

  constructor(
    public config: ConfigService,
    public http: HttpClient,
  ) { }

  refresh(): void {
    this.get().toPromise().then(
      list => this.watcher$.next(list as T[]),
      err => console.error(err)
    )
  }

  get(id?: string | number): Observable<T | T[]> {
    let url = `${this.config.apiUrl}${this.entity}`;
    if (id) {
      url += `/${id}`;
    }
    return this.http.get<T | T[]>(url);
  }

  query(queryString: string): Observable<T | T[]> {
    const url = `${this.config.apiUrl}${this.entity}?${queryString}`;
    return this.http.get<T | T[]>(url);
  }

  update(id: number | string, data: T): Observable<T> {
    const url = `${this.config.apiUrl}${this.entity}/${id}`;
    return this.http.patch<T>(url, data);
  }

  create(document:T): Observable<T> {
    const url = `${this.config.apiUrl}${this.entity}`;
    return this.http.post<T>(url, document);
  }

  remove(id: number | string): Observable<T> {
    const url = `${this.config.apiUrl}${this.entity}/${id}`;
    return this.http.delete<T>(url).pipe(
      tap( () => {
        this.refresh();
      })
    );
  }

  removeManyById(array:any): Observable<any> {
    const url = `${this.config.apiUrl}${this.entity}`;
    const data = { arrayOfIds: array };
    return this.http.delete<{ arrayOfIds: string[] }>(url, array).pipe(
      tap( () => {
        this.refresh();
      })
    );
  }
}
