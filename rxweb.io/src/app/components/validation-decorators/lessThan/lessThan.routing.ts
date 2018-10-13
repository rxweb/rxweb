import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LessThanComponent } from './lessThan.component';

const LESS_THAN_ROUTES: Routes = [
{
  path: '', component: LessThanComponent
}
];

export const LESS_THAN_ROUTING: ModuleWithProviders = RouterModule.forChild(LESS_THAN_ROUTES);
