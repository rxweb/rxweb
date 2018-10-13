import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContainsComponent } from './contains.component';

const CONTAINS_ROUTES: Routes = [
{
  path: '', component: ContainsComponent
}
];

export const CONTAINS_ROUTING: ModuleWithProviders = RouterModule.forChild(CONTAINS_ROUTES);
