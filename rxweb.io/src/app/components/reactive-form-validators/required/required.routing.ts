import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RequiredComponent } from './required.component';

const REQUIRED_ROUTES: Routes = [
{
  path: '', component: RequiredComponent
}
];

export const REQUIRED_ROUTING: ModuleWithProviders = RouterModule.forChild(REQUIRED_ROUTES);
