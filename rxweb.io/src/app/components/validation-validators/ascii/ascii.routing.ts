import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AsciiComponent } from './ascii.component';

const ASCII_ROUTES: Routes = [
{
  path: '', component: AsciiComponent
}
];

export const ASCII_ROUTING: ModuleWithProviders = RouterModule.forChild(ASCII_ROUTES);
