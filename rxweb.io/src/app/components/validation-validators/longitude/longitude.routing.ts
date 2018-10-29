import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LongitudeComponent } from './longitude.component';

const LONGITUDE_ROUTES: Routes = [
{
  path: '', component: LongitudeComponent
}
];

export const LONGITUDE_ROUTING: ModuleWithProviders = RouterModule.forChild(LONGITUDE_ROUTES);
