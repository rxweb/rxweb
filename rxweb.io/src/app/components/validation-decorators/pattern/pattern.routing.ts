import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatternComponent } from './pattern.component';

const PATTERN_ROUTES: Routes = [
{
  path: '', component: PatternComponent
}
];

export const PATTERN_ROUTING: ModuleWithProviders = RouterModule.forChild(PATTERN_ROUTES);
