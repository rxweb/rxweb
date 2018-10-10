import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GreaterThanComponent } from './greaterThan.component';

const GREATER_THAN_ROUTES: Routes = [
{
  path: '', component: GreaterThanComponent
}
];

export const GREATER_THAN_ROUTING: ModuleWithProviders = RouterModule.forChild(GREATER_THAN_ROUTES);
