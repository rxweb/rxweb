import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageComponent } from "src/app/components/page/page.component";
const CONTAINS_ROUTES: Routes = [
{
	path:':typeName',
	component:PageComponent
}

];
export const CONTAINS_ROUTING: ModuleWithProviders = RouterModule.forChild(CONTAINS_ROUTES);