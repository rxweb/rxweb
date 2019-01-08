import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageComponent } from "src/app/components/page/page.component";
const NONE_OF_ROUTES: Routes = [
{
	path:':typeName',
	component:PageComponent
}

];
export const NONE_OF_ROUTING: ModuleWithProviders = RouterModule.forChild(NONE_OF_ROUTES);