import { Component, TrackByFunction } from '@angular/core';
import { Routes } from '@angular/router';
import { ForgotPasswordComponent } from '../component/forgot-password/forgot-password.component';

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss']
})
export class DefaultLayoutComponent {
  SignInOptions: any;
  trackByFn!: TrackByFunction<any>;

  

  

}
