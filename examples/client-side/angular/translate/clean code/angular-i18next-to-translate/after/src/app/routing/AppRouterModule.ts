import { NgModule } from '@angular/core';
import { RouterModule, Routes, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { SimpleDemoComponent } from './../content/simple-demo.component';
import { AccessDeniedComponent } from './../content/access-denied/access-denied.component';

export const appRoutes: Routes = [
    { path: '', component: SimpleDemoComponent },
    {
        path: 'rich_form',
        loadChildren: () => import('../features/rich_form_feature/RichFormFeatureModule').then(m => m.RichFormFeatureModule),
    },
    { path: 'denied', component: AccessDeniedComponent }
];
@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ],
    providers: [
    ]
})
export class AppRouterModule { }
