import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
import { DashboardComponent } from "../dashboard/dashboard.component";


const APP_LAZY_ROUTES: Routes = [
  {
    path: '', redirectTo: 'dashboard', pathMatch: 'full'
  },
  {
    path: 'dashboard', component: DashboardComponent
  },
  {
    path: 'reactive-form-validators',
    loadChildren: 'src/app/components/reactive-form-validators/reactive-form-validators.module#ReactiveFormValidatorsModule',
  }
];

export const APP_LAZY_ROUTING: ModuleWithProviders = RouterModule.forRoot(APP_LAZY_ROUTES, { preloadingStrategy: PreloadAllModules });
