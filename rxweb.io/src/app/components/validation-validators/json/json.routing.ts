import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JsonComponent } from './json.component';

const JSON_ROUTES: Routes = [
{
  path: '', component: JsonComponent
}
];

export const JSON_ROUTING: ModuleWithProviders = RouterModule.forChild(JSON_ROUTES);
