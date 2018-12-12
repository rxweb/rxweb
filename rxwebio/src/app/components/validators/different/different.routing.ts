import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageComponent } from "src/app/components/form-validation/page/page.component";
const DIFFERENT_ROUTES: Routes = [
{
	path:':typeName',
	component:PageComponent
}
];
export const DIFFERENT_ROUTING: ModuleWithProviders = RouterModule.forChild(DIFFERENT_ROUTES);