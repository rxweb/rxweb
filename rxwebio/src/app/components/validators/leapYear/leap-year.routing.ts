import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageComponent } from "src/app/components/form-validation/page/page.component";
const LEAP_YEAR_ROUTES: Routes = [
{
	path:':typeName',
	component:PageComponent
}
];
export const LEAP_YEAR_ROUTING: ModuleWithProviders = RouterModule.forChild(LEAP_YEAR_ROUTES);