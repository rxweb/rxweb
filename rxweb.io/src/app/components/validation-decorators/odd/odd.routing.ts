import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OddComponent } from './odd.component';

const ODD_ROUTES: Routes = [
{
  path: '', component: OddComponent
}
];

export const ODD_ROUTING: ModuleWithProviders = RouterModule.forChild(ODD_ROUTES);
