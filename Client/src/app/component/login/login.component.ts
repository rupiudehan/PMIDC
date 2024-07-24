import { Component, TrackByFunction } from '@angular/core';
import { Routes } from '@angular/router';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

   routes: Routes = [
    { path: 'dashboard', component: DashboardComponent }
  ];

  SignInOptions: any;
  trackByFn!: TrackByFunction<any>;

  redirecttodashboard() {
    window.location.href = "/dashboard";
  }

}

