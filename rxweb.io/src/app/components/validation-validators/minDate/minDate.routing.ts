import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MinDateComponent } from './minDate.component';

const MIN_DATE_ROUTES: Routes = [
{
  path: '', component: MinDateComponent
}
];

export const MIN_DATE_ROUTING: ModuleWithProviders = RouterModule.forChild(MIN_DATE_ROUTES);
