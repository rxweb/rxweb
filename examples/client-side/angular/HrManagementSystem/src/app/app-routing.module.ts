import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', redirectTo:'login',pathMatch: 'full'
  },
  {
    path: 'login', 
    loadChildren: () => import("./components/authentication/login/login.module").then(m => m.LoginModule)
  },
  {
    path: 'dashboard', 
    loadChildren: () => import("./components/dashboard/dashboard.module").then(m => m.DashboardModule)
  },
  {
    path: 'user', 
    loadChildren: () => import("./components/user/user.module").then(m => m.UserModule)
  },
  {
		path: '**', redirectTo: 'login'
	}
];

export const ROUTES: Routes = routes;
