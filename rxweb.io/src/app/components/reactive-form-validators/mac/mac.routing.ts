import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MacComponent } from './mac.component';

const MAC_ROUTES: Routes = [
{
  path: '', component: MacComponent
}
];

export const MAC_ROUTING: ModuleWithProviders = RouterModule.forChild(MAC_ROUTES);
