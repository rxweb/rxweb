import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UrlComponent } from './url.component';

const URL_ROUTES: Routes = [
{
  path: '', component: UrlComponent
}
];

export const URL_ROUTING: ModuleWithProviders = RouterModule.forChild(URL_ROUTES);
