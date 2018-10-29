import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LatLongComponent } from './latLong.component';

const LAT_LONG_ROUTES: Routes = [
{
  path: '', component: LatLongComponent
}
];

export const LAT_LONG_ROUTING: ModuleWithProviders = RouterModule.forChild(LAT_LONG_ROUTES);
