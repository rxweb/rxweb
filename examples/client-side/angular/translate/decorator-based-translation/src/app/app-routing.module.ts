import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LazyLoadComponent } from './lazy-load/lazy-load.component';


const routes: Routes = [
    {
        path: '', redirectTo: 'en/lazy-load', pathMatch: 'full'
    },
    {
        path: ':languageCode/lazy-load', component: LazyLoadComponent
    },
    {
        path: ':languageCode/pre-load-module', loadChildren: () => import(`./pre-load-module/pre-load-module.component`).then(m => m.PreLoadModule)
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
