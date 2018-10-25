import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
import { DashboardComponent } from "../dashboard/dashboard.component";
import { ImportModulesComponent } from "src/app/components/import-modules/import.modules.component";
import { ConfigureGlobalValidationMessagesComponent } from "src/app/components/configure-global-validation-messages/configure-global-validation-messages.component";
import { HomeComponent } from "src/app/components/home/home.component";
import { NoPreloading } from "@angular/router";


const APP_LAZY_ROUTES: Routes = [
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
  {
    path: 'dashboard', component: DashboardComponent
  },
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'import-modules', component: ImportModulesComponent
  },
  {
    path: 'configure-global-validation-messages', component: ConfigureGlobalValidationMessagesComponent
  },
  {
    path: 'validation-decorators',
    loadChildren: 'src/app/components/validation-decorators/validation-decorators.module#ValidationDecoratorsModule',
  },
  {
    path: 'validation-validators',
    loadChildren: 'src/app/components/validation-validators/validation-validators.module#ValidationValidatorsModule',
  },
 
];

export const APP_LAZY_ROUTING: ModuleWithProviders = RouterModule.forRoot(APP_LAZY_ROUTES, { preloadingStrategy: NoPreloading });
