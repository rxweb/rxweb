import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EndsWithComponent } from './endsWith.component';

const ENDS_WITH_ROUTES: Routes = [
{
  path: '', component: EndsWithComponent
}
];

export const ENDS_WITH_ROUTING: ModuleWithProviders = RouterModule.forChild(ENDS_WITH_ROUTES);
