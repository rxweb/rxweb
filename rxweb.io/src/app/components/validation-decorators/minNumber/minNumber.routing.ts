import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MinNumberComponent } from './minNumber.component';

const MIN_NUMBER_ROUTES: Routes = [
{
  path: '', component: MinNumberComponent
}
];

export const MIN_NUMBER_ROUTING: ModuleWithProviders = RouterModule.forChild(MIN_NUMBER_ROUTES);
