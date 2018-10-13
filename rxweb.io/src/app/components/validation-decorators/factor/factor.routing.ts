import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FactorComponent } from './factor.component';

const FACTOR_ROUTES: Routes = [
{
  path: '', component: FactorComponent
}
];

export const FACTOR_ROUTING: ModuleWithProviders = RouterModule.forChild(FACTOR_ROUTES);
