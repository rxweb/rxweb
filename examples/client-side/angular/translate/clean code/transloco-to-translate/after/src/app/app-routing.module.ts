import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'lazy',
        loadChildren: () => import('./lazy/lazy.module').then(m => m.LazyModule)
    },
    {
        path: 'scope-sharing',
        loadChildren: () => import('./scope-sharing/scope-sharing.module').then(m => m.ScopeSharingModule)
    },
    {
        path: 'dynamic-translation',
        loadChildren: () => import('./dynamic-translation/dynamic-translation.module').then(m => m.DynamicTranslationModule)
    },
    {
        path: 'multilangs',
        loadChildren: () => import('./multilangs/multilangs.module').then(m => m.MultilangsModule)
    },
    {
        path: 'transpilers',
        loadChildren: () => import('./transpilers/transpilers.module').then(m => m.TranspilersModule)
    },
    {
        path: 'locale',
        loadChildren: './locale/locale.module#LocaleModule'
    },
    {
        path: 'inline-loaders',
        loadChildren: () => import('./inline-loaders/inline-loaders.module').then(m => m.InlineLoadersModule)
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
