import { Routes } from '@angular/router';
import { BaseCanActivate } from '@rxweb/angular-router';
import { LoginComponent } from './login.component';

export const LOGIN_ROUTES: Routes = [
    { 
        component: LoginComponent, 
        path: '', 
        canActivate: [BaseCanActivate],  data: {title: 'Login'} 
    }
];
