import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageComponent } from "src/app/components/form-validation/page/page.component";
const LONGITUDE_ROUTES: Routes = [
{
	path:':typeName',
	component:PageComponent
}
];
export const LONGITUDE_ROUTING: ModuleWithProviders = RouterModule.forChild(LONGITUDE_ROUTES);