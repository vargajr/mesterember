import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from './models/user';
import { AuthService } from './services/auth.service';
import { ConfigService } from './services/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'frontend';
  menuItems = this.config.menuItems;
  loginStatus = false;
  userSub: Subscription = new Subscription();
  user: User | null = null;

  constructor(
    private config: ConfigService,
    private auth: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.userSub = this.auth.currentUserSubject.subscribe(
      user => this.user = user
    );
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  onLogin() {
    this.router.navigate(['/', 'login'])
  }

  onLogout() {
    this.auth.logout();
  }
}
