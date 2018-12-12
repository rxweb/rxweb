import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageComponent } from "src/app/components/form-validation/page/page.component";
const FACTOR_ROUTES: Routes = [
{
	path:':typeName',
	component:PageComponent
}
];
export const FACTOR_ROUTING: ModuleWithProviders = RouterModule.forChild(FACTOR_ROUTES);