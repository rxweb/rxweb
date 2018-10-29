import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataUriComponent } from './dataUri.component';

const DATA_URI_ROUTES: Routes = [
{
  path: '', component: DataUriComponent
}
];

export const DATA_URI_ROUTING: ModuleWithProviders = RouterModule.forChild(DATA_URI_ROUTES);
