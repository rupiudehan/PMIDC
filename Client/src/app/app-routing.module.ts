import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultLayoutComponent } from './default-layout/default-layout.component';
import { FullComponent } from './layouts/full/full.component';

export const Approutes: Routes = [
  {
    path: '', // Separate route for login
    component: DefaultLayoutComponent, // Use DefaultLayoutComponent for login
    children: [
      { path: '', redirectTo: 'default-layout', pathMatch: 'full' },
      {
        path: 'login', // Empty path to load the login component
        loadChildren: () => import('./component/login/login.module').then(m => m.LoginModule)
      }
    ]
  },
  // {
  //   path: '', // Root path for the rest of the application
  //   component: DefaultLayoutComponent, // Use FullComponent for other pages
  //   children: [
  //     { path: '', redirectTo: 'loggin', pathMatch: 'full' },
  //     {
  //       path: 'loggin',
  //       loadChildren: () => import('./loggin/loggin.module').then(m => m.LogginModule)
  //     },

  //   ]
  // },
  {
    path: '', // Root path for the rest of the application
    component: FullComponent, // Use FullComponent for other pages
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'about',
        loadChildren: () => import('./about/about.module').then(m => m.AboutModule)
      },
      {
        path: 'component',
        loadChildren: () => import('./component/component.module').then(m => m.ComponentsModule)
      }
    ]
  },
  
  {
    path: '**',
    redirectTo: '/starter'
  }
];