import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageComponent } from "src/app/components/form-validation/page/page.component";
const MAX_NUMBER_ROUTES: Routes = [
{
	path:':typeName',
	component:PageComponent
}
];
export const MAX_NUMBER_ROUTING: ModuleWithProviders = RouterModule.forChild(MAX_NUMBER_ROUTES);