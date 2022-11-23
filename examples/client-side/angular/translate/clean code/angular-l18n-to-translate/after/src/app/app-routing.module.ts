import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { OnPushComponent } from './on-push/on-push.component';
import { ValidationComponent } from './validation/validation.component';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'on-push', component: OnPushComponent },
    { path: 'validation', component: ValidationComponent },
    {
        path: 'lazy',
        loadChildren: () => import('./lazy/lazy.module').then(m => m.LazyModule),
    },
    { path: '**', redirectTo: 'home' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            useHash: true
        })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
