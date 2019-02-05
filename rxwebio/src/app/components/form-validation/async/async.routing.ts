import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageComponent } from "src/app/components/page/page.component";
const ASYNC_ROUTES: Routes = [
{
	path:':typeName',
	component:PageComponent
}

];
export const ASYNC_ROUTING: ModuleWithProviders = RouterModule.forChild(ASYNC_ROUTES);