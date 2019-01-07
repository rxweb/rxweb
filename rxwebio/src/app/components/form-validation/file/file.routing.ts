import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageComponent } from "src/app/components/page/page.component";
const FILE_ROUTES: Routes = [
{
	path:':typeName',
	component:PageComponent
}

];
export const FILE_ROUTING: ModuleWithProviders = RouterModule.forChild(FILE_ROUTES);