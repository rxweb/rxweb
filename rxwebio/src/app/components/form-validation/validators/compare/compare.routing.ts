import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageComponent } from "src/app/components/form-validation/page/page.component";
const COMPARE_ROUTES: Routes = [
{
	path:':typeName',
	component:PageComponent
},
{
	path:':typeName/:templateDrivenType',
	component:PageComponent
}
];
export const COMPARE_ROUTING: ModuleWithProviders = RouterModule.forChild(COMPARE_ROUTES);