import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageComponent } from "src/app/components/page/page.component";
const ALPHA_ROUTES: Routes = [
{
	path:':typeName',
	component:PageComponent
}

];
export const ALPHA_ROUTING: ModuleWithProviders = RouterModule.forChild(ALPHA_ROUTES);