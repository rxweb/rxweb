import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageComponent } from "src/app/components/form-validation/page/page.component";
const LAT_LONG_ROUTES: Routes = [
{
	path:':typeName',
	component:PageComponent
}
];
export const LAT_LONG_ROUTING: ModuleWithProviders = RouterModule.forChild(LAT_LONG_ROUTES);