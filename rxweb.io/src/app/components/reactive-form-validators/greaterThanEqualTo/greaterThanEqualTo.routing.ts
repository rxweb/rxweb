import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GreaterThanEqualToComponent } from './greaterThanEqualTo.component';

const GREATER_THAN_EQUAL_TO_ROUTES: Routes = [
{
  path: '', component: GreaterThanEqualToComponent
}
];

export const GREATER_THAN_EQUAL_TO_ROUTING: ModuleWithProviders = RouterModule.forChild(GREATER_THAN_EQUAL_TO_ROUTES);
