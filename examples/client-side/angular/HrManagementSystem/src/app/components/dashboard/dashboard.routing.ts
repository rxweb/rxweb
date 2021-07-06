import { Routes } from '@angular/router';
import { BaseCanActivate } from '@rxweb/angular-router';
import { DashboardComponent } from './dashboard.component';

export const DASHBOARD_ROUTES: Routes = [
    { 
        component: DashboardComponent, 
        path: '', 
        canActivate: [BaseCanActivate]
    }
];
