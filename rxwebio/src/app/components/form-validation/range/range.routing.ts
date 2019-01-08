import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageComponent } from "src/app/components/page/page.component";
const RANGE_ROUTES: Routes = [
{
	path:':typeName',
	component:PageComponent
}

];
export const RANGE_ROUTING: ModuleWithProviders = RouterModule.forChild(RANGE_ROUTES);