import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageComponent } from "src/app/components/page/page.component";
const REQUIRED_ROUTES: Routes = [
{
	path:':typeName',
	component:PageComponent
}

];
export const REQUIRED_ROUTING: ModuleWithProviders = RouterModule.forChild(REQUIRED_ROUTES);