import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageComponent } from "src/app/components/page/page.component";
const LESS_THAN_EQUAL_TO_ROUTES: Routes = [
{
	path:':typeName',
	component:PageComponent
},
{
	path:':typeName/:templateDrivenType',
	component:PageComponent
}
];
export const LESS_THAN_EQUAL_TO_ROUTING: ModuleWithProviders = RouterModule.forChild(LESS_THAN_EQUAL_TO_ROUTES);