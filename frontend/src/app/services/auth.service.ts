import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { User } from '../models/user';
import { ConfigService } from './config.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginUrl: string = `${this.config.apiUrl}login`;
  logoutUrl: string = `${this.config.apiUrl}logout`;
  currentUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  lastToken: string = '';
  storageName: string = 'currentUser';

  constructor(
    private config: ConfigService,
    private http: HttpClient,
    private router: Router,
  ) {
    const storedUser = localStorage.getItem(this.storageName);
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.token) {
        this.currentUserSubject.next(user);
        this.lastToken = user.token;
      }
    }
  }

  get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(loginData: User): Observable<User | null> {
    return this.http.post<{ accessToken: string, refreshtoken: string, user: User }>(
      this.loginUrl,
      { email: loginData.email, password: loginData.password }
    )
    .pipe( switchMap(response => {
      if (response.accessToken) {
        this.lastToken = response.accessToken;
        return of(response.user);
      }
      return of(null);
    }))
    .pipe(
      tap(user => {
        if (!user) {
          localStorage.removeItem(this.storageName);
          this.lastToken = '';
          this.currentUserSubject.next(null);
        } else {
          user.token = this.lastToken;
          localStorage.setItem(this.storageName, JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem(this.storageName);
    this.currentUserSubject.next(null);
    this.router.navigate(['login']);
  }
}
