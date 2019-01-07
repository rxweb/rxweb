import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageComponent } from "src/app/components/page/page.component";
const EXTENSION_ROUTES: Routes = [
{
	path:':typeName',
	component:PageComponent
}

];
export const EXTENSION_ROUTING: ModuleWithProviders = RouterModule.forChild(EXTENSION_ROUTES);