import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageComponent } from "src/app/components/page/page.component";
const FILE_SIZE_ROUTES: Routes = [
{
	path:':typeName',
	component:PageComponent
}

];
export const FILE_SIZE_ROUTING: ModuleWithProviders = RouterModule.forChild(FILE_SIZE_ROUTES);