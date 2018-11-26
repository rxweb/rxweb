import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageComponent } from "src/app/components/form-validation/page/page.component";
const MAX_DATE_ROUTES: Routes = [
{
	path:':typeName',
	component:PageComponent
}
];
export const MAX_DATE_ROUTING: ModuleWithProviders = RouterModule.forChild(MAX_DATE_ROUTES);