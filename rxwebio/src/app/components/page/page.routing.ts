import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageComponent } from "src/app/components/page/page.component";

const PAGE_ROUTES: Routes = [
{
  path: '', component: PageComponent
}
];

export const PAGE_ROUTING: ModuleWithProviders = RouterModule.forChild(PAGE_ROUTES);
