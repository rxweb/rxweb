import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TextPageComponent } from './text-page.component';

const TEXT_PAGE_ROUTES: Routes = [
{
  path: '', component: TextPageComponent
},
];

export const TEXT_PAGE_ROUTING: ModuleWithProviders = RouterModule.forChild(TEXT_PAGE_ROUTES);
