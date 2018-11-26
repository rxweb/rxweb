import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageComponent } from "src/app/components/form-validation/page/page.component";

const PAGE_ROUTES: Routes = [
{
  path: 'decorators', component: PageComponent
},
{
  path: 'validators', component: PageComponent
},
{
  path: 'template-driven', component: PageComponent
}
];

export const PAGE_ROUTING: ModuleWithProviders = RouterModule.forChild(PAGE_ROUTES);
