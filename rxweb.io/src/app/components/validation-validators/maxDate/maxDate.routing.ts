import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaxDateComponent } from './maxDate.component';

const MAX_DATE_ROUTES: Routes = [
{
  path: '', component: MaxDateComponent
}
];

export const MAX_DATE_ROUTING: ModuleWithProviders = RouterModule.forChild(MAX_DATE_ROUTES);
