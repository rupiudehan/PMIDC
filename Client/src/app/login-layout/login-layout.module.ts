import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginLayoutComponent } from './login-layout.component';
import { Routes } from '@angular/router';


const routes: Routes = [
  {
    path: "",
    data: {
      title: "Login",
      urls: [{ title: "Login", url: "/loggin" }, { title: "Login" }],
    },
    component:     LoginLayoutComponent    ,
  },
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
 

  ]
})
export class LoginLayoutModule { }
