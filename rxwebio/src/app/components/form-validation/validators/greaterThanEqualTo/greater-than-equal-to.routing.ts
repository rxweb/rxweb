import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageComponent } from "src/app/components/form-validation/page/page.component";
const GREATER_THAN_EQUAL_TO_ROUTES: Routes = [
{
	path:':typeName',
	component:PageComponent
},
{
	path:':typeName/:templateDrivenType',
	component:PageComponent
}
];
export const GREATER_THAN_EQUAL_TO_ROUTING: ModuleWithProviders = RouterModule.forChild(GREATER_THAN_EQUAL_TO_ROUTES);