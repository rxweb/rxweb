import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
import { DashboardComponent } from "../dashboard/dashboard.component";
import { HomeComponent } from "src/app/components/home/home.component";
import { NoPreloading } from "@angular/router";
import { GettingStartedComponent } from "src/app/components/getting-started/getting-started.component";


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
    path: 'getting-started', component: GettingStartedComponent
  },
  {
    path: 'form-validations',
    loadChildren: 'src/app/components/form-validation/form-validation.module#FormValidationModule',
  },
  {
    path: '**', 
    redirectTo:'home',
    pathMatch: 'full'
  }
 
];

export const APP_LAZY_ROUTING: ModuleWithProviders = RouterModule.forRoot(APP_LAZY_ROUTES, { 
      preloadingStrategy: NoPreloading,
    });
