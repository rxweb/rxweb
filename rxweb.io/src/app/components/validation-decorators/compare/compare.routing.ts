import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompareComponent } from './compare.component';

const COMPARE_ROUTES: Routes = [
{
  path: '', component: CompareComponent
}
];

export const COMPARE_ROUTING: ModuleWithProviders = RouterModule.forChild(COMPARE_ROUTES);
