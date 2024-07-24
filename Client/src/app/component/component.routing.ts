import { StateReportComponent } from './state-report/state-report.component';
import { PaymentRequestComponent } from './payment-request/payment-request.component';
import { Routes } from '@angular/router';
import { NgbdpaginationBasicComponent } from './pagination/pagination.component';
import { NgbdAlertBasicComponent } from './alert/alert.component';

import { NgbdDropdownBasicComponent } from './dropdown-collapse/dropdown-collapse.component';
import { NgbdnavBasicComponent } from './nav/nav.component';
import { BadgeComponent } from './badge/badge.component';
import { NgbdButtonsComponent } from './buttons/buttons.component';
import { CardsComponent } from './card/card.component';
import { TableComponent } from './table/table.component';
import { CountryComponent } from './country/country.component';
import { StateComponent } from './state/state.component';
import { RolesComponent } from './roles/roles.component';
import { LevelsComponent } from './levels/levels.component';
import { UsersComponent } from './users/users.component';
import { SchemeComponent } from './scheme/scheme.component';
import { SubSchemeComponent } from './sub-scheme/sub-scheme.component';
import { SubComponentComponent } from './sub-component/sub-component.component';
import { FundsComponent } from './funds/funds.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AddVendorComponent } from './add-vendor/add-vendor.component';
import { PaymentFormComponent } from './payment-form/payment-form.component';
import { CashbookComponent } from './cashbook/cashbook.component';
import { IaReportComponent } from './ia-report/ia-report.component';
import { AssignLimitComponent } from './assign-limit/assign-limit.component';







export const ComponentsRoutes: Routes = [
	{
		path: '',
		children: [
			{
				path: 'table',
				component: TableComponent
			},
			{
				path: 'country',
				component: CountryComponent
			},
			{
				path: 'state',
				component: StateComponent
			},
			{
				path: 'levels',
				component: LevelsComponent
			},
			{
				path: 'roles',
				component: RolesComponent
			},
			{
				path: 'users',
				component: UsersComponent
			},
			{
				path: 'scheme',
				component: SchemeComponent
			},
			{
				path: 'sub-scheme',
				component: SubSchemeComponent
			},
			{
				path: 'sub-component',
				component: SubComponentComponent
			},
			{
				path: 'funds',
				component: FundsComponent
			},
			{
				path: 'assign-limit',
				component: AssignLimitComponent
			},
			{
				path: 'login',
				component: LoginComponent
			},
			{
				path: 'register',
				component: RegisterComponent
			},
			{
				path: 'forgot-password',
				component: ForgotPasswordComponent
			},
			{
				path: 'add-user',
				component: AddUserComponent
			},
			{
				path: 'change-password',
				component: ChangePasswordComponent
			},
			{
				path: 'add-vendor',
				component: AddVendorComponent
			},
			{
				path: 'payment-form',
				component: PaymentFormComponent
			},
			{
				path: 'payment-request',
				component: PaymentRequestComponent
			},
			{
				path: 'ia-report',
				component: IaReportComponent
			},
			{
				path: 'state-report',
				component: StateReportComponent
			},
			{
				path: 'cashbook',
				component: CashbookComponent
			},
			{
				path: 'card',
				component: CardsComponent
			},
			{
				path: 'pagination',
				component: NgbdpaginationBasicComponent
			},
			{
				path: 'badges',
				component: BadgeComponent
			},
			{
				path: 'alert',
				component: NgbdAlertBasicComponent
			},
			{
				path: 'dropdown',
				component: NgbdDropdownBasicComponent
			},
			{
				path: 'nav',
				component: NgbdnavBasicComponent
			},
			{
				path: 'buttons',
				component: NgbdButtonsComponent
			}
		]
	}
];
