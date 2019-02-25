import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageComponent } from "src/app/components/page/page.component";
const DIRTY_CHECK_ROUTES: Routes = [
{
	path:':typeName/:templateDrivenType',
	component:PageComponent
},
{
	path:':typeName',
	component:PageComponent
}

];
export const DIRTY_CHECK_ROUTING: ModuleWithProviders = RouterModule.forChild(DIRTY_CHECK_ROUTES);