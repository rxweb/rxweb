import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TimeComponent } from './time.component';

const TIME_ROUTES: Routes = [
{
  path: '', component: TimeComponent
}
];

export const TIME_ROUTING: ModuleWithProviders = RouterModule.forChild(TIME_ROUTES);
