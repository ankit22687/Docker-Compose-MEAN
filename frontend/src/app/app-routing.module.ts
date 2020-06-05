import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './components/core/guards/auth.guard';


const routes: Routes = [];

const appRoutes: Routes = [
  {
    path: '',
    //loadChildren: './components/auth/auth.module#AuthModule',
    loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule),
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    //loadChildren: './dashboard/dashboard.module#DashboardModule',
    loadChildren: () => import('./components/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'customers',
    loadChildren: () => import('./components/customers/customers.module').then(m => m.CustomersModule),
    canActivate: [AuthGuard]
  },
  // {
  //     path: 'users',
  //     loadChildren: './users/users.module#UsersModule',
  //     canActivate: [AuthGuard]
  // },
  {
    path: 'account',
    loadChildren: () => import('./components/account/account.module').then(m => m.AccountModule),
    canActivate: [AuthGuard]
  },
  // {
  //     path: 'icons',
  //     loadChildren: './icons/icons.module#IconsModule',
  //     canActivate: [AuthGuard]
  // },
  // {
  //     path: 'typography',
  //     loadChildren: './typography/typography.module#TypographyModule',
  //     canActivate: [AuthGuard]
  // },
  // {
  //     path: 'about',
  //     loadChildren: './about/about.module#AboutModule',
  //     canActivate: [AuthGuard]
  // },
  // {
  //   path: '**',
  //   redirectTo: 'dashboard',
  //   pathMatch: 'full'
  // }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
