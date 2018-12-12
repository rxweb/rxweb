import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageComponent } from "src/app/components/form-validation/page/page.component";
const JSON_ROUTES: Routes = [
{
	path:':typeName',
	component:PageComponent
}
];
export const JSON_ROUTING: ModuleWithProviders = RouterModule.forChild(JSON_ROUTES);