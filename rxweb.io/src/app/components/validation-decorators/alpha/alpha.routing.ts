import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlphaComponent } from './alpha.component';

const ALPHA_ROUTES: Routes = [
{
  path: '', component: AlphaComponent
}
];

export const ALPHA_ROUTING: ModuleWithProviders = RouterModule.forChild(ALPHA_ROUTES);
