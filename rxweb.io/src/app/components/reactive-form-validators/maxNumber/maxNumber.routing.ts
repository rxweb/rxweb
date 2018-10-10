import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaxNumberComponent } from './maxNumber.component';

const MAX_NUMBER_ROUTES: Routes = [
{
  path: '', component: MaxNumberComponent
}
];

export const MAX_NUMBER_ROUTING: ModuleWithProviders = RouterModule.forChild(MAX_NUMBER_ROUTES);
