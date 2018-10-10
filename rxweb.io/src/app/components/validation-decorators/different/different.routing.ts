import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DifferentComponent } from './different.component';

const DIFFERENT_ROUTES: Routes = [
{
  path: '', component: DifferentComponent
}
];

export const DIFFERENT_ROUTING: ModuleWithProviders = RouterModule.forChild(DIFFERENT_ROUTES);
