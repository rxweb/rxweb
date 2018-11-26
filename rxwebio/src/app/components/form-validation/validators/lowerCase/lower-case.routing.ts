import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageComponent } from "src/app/components/form-validation/page/page.component";
const LOWER_CASE_ROUTES: Routes = [
{
	path:':typeName',
	component:PageComponent
}
];
export const LOWER_CASE_ROUTING: ModuleWithProviders = RouterModule.forChild(LOWER_CASE_ROUTES);