import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NumericComponent } from './numeric.component';

const NUMERIC_ROUTES: Routes = [
{
  path: '', component: NumericComponent
}
];

export const NUMERIC_ROUTING: ModuleWithProviders = RouterModule.forChild(NUMERIC_ROUTES);
