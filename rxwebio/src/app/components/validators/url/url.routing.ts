import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageComponent } from "src/app/components/form-validation/page/page.component";
const URL_ROUTES: Routes = [
{
	path:':typeName',
	component:PageComponent
}
];
export const URL_ROUTING: ModuleWithProviders = RouterModule.forChild(URL_ROUTES);