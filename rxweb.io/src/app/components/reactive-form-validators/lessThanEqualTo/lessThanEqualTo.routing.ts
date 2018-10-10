import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LessThanEqualToComponent } from './lessThanEqualTo.component';

const LESS_THAN_EQUAL_TO_ROUTES: Routes = [
{
  path: '', component: LessThanEqualToComponent
}
];

export const LESS_THAN_EQUAL_TO_ROUTING: ModuleWithProviders = RouterModule.forChild(LESS_THAN_EQUAL_TO_ROUTES);
