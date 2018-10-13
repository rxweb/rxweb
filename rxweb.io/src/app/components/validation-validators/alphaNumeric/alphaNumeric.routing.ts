import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlphaNumericComponent } from './alphaNumeric.component';

const ALPHA_NUMERIC_ROUTES: Routes = [
{
  path: '', component: AlphaNumericComponent
}
];

export const ALPHA_NUMERIC_ROUTING: ModuleWithProviders = RouterModule.forChild(ALPHA_NUMERIC_ROUTES);
