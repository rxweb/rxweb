import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LowerCaseComponent } from './lowerCase.component';

const LOWER_CASE_ROUTES: Routes = [
{
  path: '', component: LowerCaseComponent
}
];

export const LOWER_CASE_ROUTING: ModuleWithProviders = RouterModule.forChild(LOWER_CASE_ROUTES);
