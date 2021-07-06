import { Routes } from '@angular/router';
import { BaseCanActivate } from '@rxweb/angular-router';
import { UserComponent } from './user.component';


export const USER_ROUTES: Routes = [
    { 
        component: UserComponent, 
        path: '', 
        canActivate: [BaseCanActivate]
    }
];
