import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaxLengthComponent } from './maxLength.component';

const MAX_LENGTH_ROUTES: Routes = [
{
  path: '', component: MaxLengthComponent
}
];

export const MAX_LENGTH_ROUTING: ModuleWithProviders = RouterModule.forChild(MAX_LENGTH_ROUTES);
