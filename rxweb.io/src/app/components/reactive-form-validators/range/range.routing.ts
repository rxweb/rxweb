import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RangeComponent } from './range.component';

const RANGE_ROUTES: Routes = [
{
  path: '', component: RangeComponent
}
];

export const RANGE_ROUTING: ModuleWithProviders = RouterModule.forChild(RANGE_ROUTES);
