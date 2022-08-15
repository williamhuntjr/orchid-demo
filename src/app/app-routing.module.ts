import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginPageComponent } from './auth/login-page/login-page.component';
import { LogoutPageComponent } from './auth/logout-page/logout-page.component';
import { CameraDashboardComponent } from './camera/camera-dashboard/camera-dashboard.component'

const routes: Routes = [
  { path: '', component: CameraDashboardComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'logout', component: LogoutPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
