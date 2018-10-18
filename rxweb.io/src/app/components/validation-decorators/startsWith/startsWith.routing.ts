import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StartsWithComponent } from './startsWith.component';

const STARTS_WITH_ROUTES: Routes = [
{
  path: '', component: StartsWithComponent
}
];

export const STARTS_WITH_ROUTING: ModuleWithProviders = RouterModule.forChild(STARTS_WITH_ROUTES);
