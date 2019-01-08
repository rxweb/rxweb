import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageComponent } from '../../page/page.component';
const ALL_OF_ROUTES: Routes = [
{
	path:':typeName',
	component:PageComponent
}
];
export const ALL_OF_ROUTING: ModuleWithProviders = RouterModule.forChild(ALL_OF_ROUTES);