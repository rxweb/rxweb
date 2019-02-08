import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
import { DashboardComponent } from "../dashboard/dashboard.component";
import { HomeComponent } from "src/app/components/home/home.component";
import { NoPreloading } from "@angular/router";
import { GettingStartedComponent } from "src/app/components/getting-started/getting-started.component";
import { ReactiveFormConfigComponent } from "../reactive-form-config/reactive-form-config.component";
import { FormBuilderComponent } from "../form-builder/form-builder.component";
import { ConditionalValidationComponent } from "src/assets/examples/advance-form-validations/conditional-validation/conditional-validation.component";


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
    path:'api/reactive-form-config',component:ReactiveFormConfigComponent
  },
  {
    path: 'advance-form-validation',
    loadChildren: 'src/app/components/advance-form-validation/advance-form-validation.module#AdvanceFormValidationModule',
  },
  {
    path: 'form-validations',
    loadChildren: 'src/app/components/form-validation/form-validation.module#FormValidationModule',
  },
  {
    path: 'decorators',
    loadChildren: 'src/app/components/decorators/decorators.module#DecoratorsModule',
  },
  {
    path: 'community',
    loadChildren: 'src/app/components/community/community.module#CommunityModule',
  },
  {
    path: 'form-builder',
    loadChildren: 'src/app/components/form-builder/form-builder-shared.module#FormBuilderSharedModule',
  },
  {
    path: 'dynamic-form-builder',
    loadChildren: 'src/app/components/dynamic-form-builder/dynamic-form-builder.module#DynamicFormBuilderModule',
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
