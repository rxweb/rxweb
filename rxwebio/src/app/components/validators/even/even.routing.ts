import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageComponent } from "src/app/components/form-validation/page/page.component";
const EVEN_ROUTES: Routes = [
{
	path:':typeName',
	component:PageComponent
}
];
export const EVEN_ROUTING: ModuleWithProviders = RouterModule.forChild(EVEN_ROUTES);