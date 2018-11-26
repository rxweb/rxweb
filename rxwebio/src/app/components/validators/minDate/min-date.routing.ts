import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageComponent } from "src/app/components/form-validation/page/page.component";
const MIN_DATE_ROUTES: Routes = [
{
	path:':typeName',
	component:PageComponent
}
];
export const MIN_DATE_ROUTING: ModuleWithProviders = RouterModule.forChild(MIN_DATE_ROUTES);