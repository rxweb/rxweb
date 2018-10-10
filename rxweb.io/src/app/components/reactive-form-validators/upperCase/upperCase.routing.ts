import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UpperCaseComponent } from './upperCase.component';

const UPPER_CASE_ROUTES: Routes = [
{
  path: '', component: UpperCaseComponent
}
];

export const UPPER_CASE_ROUTING: ModuleWithProviders = RouterModule.forChild(UPPER_CASE_ROUTES);
