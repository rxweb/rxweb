import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EvenComponent } from './even.component';

const EVEN_ROUTES: Routes = [
{
  path: '', component: EvenComponent
}
];

export const EVEN_ROUTING: ModuleWithProviders = RouterModule.forChild(EVEN_ROUTES);
