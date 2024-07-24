import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ComponentsRoutes } from './component.routing';
import { NgbdpaginationBasicComponent } from './pagination/pagination.component';
import { NgbdAlertBasicComponent } from './alert/alert.component';
import { NgbdDropdownBasicComponent } from './dropdown-collapse/dropdown-collapse.component';
import { NgbdnavBasicComponent } from './nav/nav.component';
import { NgbdButtonsComponent } from './buttons/buttons.component';
import { CardsComponent } from './card/card.component';
import { TableComponent } from "./table/table.component";
import { CountryComponent } from './country/country.component';
import { StateComponent } from './state/state.component';
import { RolesComponent } from './roles/roles.component';
import { LevelsComponent } from './levels/levels.component';
import { UsersComponent } from './users/users.component';
import { SchemeComponent } from './scheme/scheme.component';
import { SubSchemeComponent } from './sub-scheme/sub-scheme.component';
import { SubComponentComponent } from './sub-component/sub-component.component';
import { FundsComponent } from './funds/funds.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AddVendorComponent } from './add-vendor/add-vendor.component';
import { PaymentFormComponent } from './payment-form/payment-form.component';
import { PaymentRequestComponent } from './payment-request/payment-request.component';
import { StateReportComponent } from './state-report/state-report.component';
import { IaReportComponent } from './ia-report/ia-report.component';
import { CashbookComponent } from './cashbook/cashbook.component';
import { AssignLimitComponent } from './assign-limit/assign-limit.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ComponentsRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgbdpaginationBasicComponent,
    NgbdAlertBasicComponent,
    NgbdDropdownBasicComponent,
    NgbdnavBasicComponent,
    NgbdButtonsComponent,
    CardsComponent,
    TableComponent,
    
  ],
  declarations: [
    CountryComponent,
    StateComponent,
    RolesComponent,
    LevelsComponent,
    UsersComponent,
    SchemeComponent,
    SubSchemeComponent,
    SubComponentComponent,
    FundsComponent,
    RegisterComponent,
    LoginComponent,
    AddUserComponent,
    ForgotPasswordComponent,
    ChangePasswordComponent,
    AddVendorComponent,
    PaymentFormComponent,
    PaymentRequestComponent,
    StateReportComponent,
    IaReportComponent,
    CashbookComponent,
    AssignLimitComponent,
  ],
})
export class ComponentsModule { }
