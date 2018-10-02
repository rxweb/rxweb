import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MinLengthComponent } from './minLength.component';

const MIN_LENGTH_ROUTES: Routes = [
{
  path: '', component: MinLengthComponent
}
];

export const MIN_LENGTH_ROUTING: ModuleWithProviders = RouterModule.forChild(MIN_LENGTH_ROUTES);
