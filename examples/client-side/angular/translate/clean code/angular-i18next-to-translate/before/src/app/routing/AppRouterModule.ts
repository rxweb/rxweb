import { I18NEXT_SERVICE, ITranslationService, I18NextModule, I18NEXT_NAMESPACE_RESOLVER } from 'angular-i18next';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { SimpleDemoComponent } from './../content/simple-demo.component';
import { AppErrorComponent } from './../structure/app-error.component';
import { AccessDeniedComponent } from './../content/access-denied/access-denied.component';

export const appRoutes: Routes = [
    { path: '', component: SimpleDemoComponent },
    {
        path: 'rich_form',
        loadChildren: () => import('../features/rich_form_feature/RichFormFeatureModule').then(m => m.RichFormFeatureModule),
        data: {
            i18nextNamespaces: ['feature.rich_form']
        },
        resolve: {
            i18next: I18NEXT_NAMESPACE_RESOLVER
        }
    },
    { path: 'denied', component: AccessDeniedComponent, data: { title: 'error:access_denied' } }
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
