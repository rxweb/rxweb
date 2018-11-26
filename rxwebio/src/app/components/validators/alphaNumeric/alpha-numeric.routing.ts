import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageComponent } from "src/app/components/form-validation/page/page.component";
const ALPHA_NUMERIC_ROUTES: Routes = [
{
	path:':typeName',
	component:PageComponent
}
];
export const ALPHA_NUMERIC_ROUTING: ModuleWithProviders = RouterModule.forChild(ALPHA_NUMERIC_ROUTES);