import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForbiddenComponent } from './pages/forbidden/forbidden.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ServiceaddComponent } from './pages/serviceadd/serviceadd.component';
import { ServicedetailsComponent } from './pages/servicedetails/servicedetails.component';
import { ServiceeditComponent } from './pages/serviceedit/serviceedit.component';
import { ServicelistComponent } from './pages/servicelist/servicelist.component';
import { UseraddComponent } from './pages/useradd/useradd.component';
import { UsereditComponent } from './pages/useredit/useredit.component';
import { UserlistComponent } from './pages/userlist/userlist.component';
import { AuthGuardService } from './services/auth-guard.service';
import { RoleGuardService } from './services/role-guard.service';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'users',
    component: UserlistComponent,
    canActivate: [RoleGuardService],
    data: {
      expectedRole: 2
    }
  },
  {
    path: 'users/edit/:id',
    component: UsereditComponent,
    canActivate: [RoleGuardService],
    data: {
      expectedRole: 3
    }
  },
  {
    path: 'users/new',
    component: UseraddComponent,
    canActivate: [RoleGuardService],
    data: {
      expectedRole: 3
    }
  },
  {
    path: 'services',
    component: ServicelistComponent,
    canActivate: [RoleGuardService],
    data: {
      expectedRole: 2
    }
  },
  {
    path: 'services/details/:id',
    component: ServicedetailsComponent,
    canActivate: [RoleGuardService],
    data: {
      expectedRole: 2
    }
  },
  {
    path: 'services/edit/:id',
    component: ServiceeditComponent,
    canActivate: [RoleGuardService],
    data: {
      expectedRole: 2
    }
  },
  {
    path: 'services/new',
    component: ServiceaddComponent,
    canActivate: [RoleGuardService],
    data: {
      expectedRole: 2
    }
  },
  {
    path: 'forbidden',
    component: ForbiddenComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
