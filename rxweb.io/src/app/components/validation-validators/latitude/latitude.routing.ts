import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LatitudeComponent } from './latitude.component';

const LATITUDE_ROUTES: Routes = [
{
  path: '', component: LatitudeComponent
}
];

export const LATITUDE_ROUTING: ModuleWithProviders = RouterModule.forChild(LATITUDE_ROUTES);
