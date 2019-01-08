import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageComponent } from "src/app/components/page/page.component";
const PROP_OBJECT_ROUTES: Routes = [
{
	path:':typeName',
	component:PageComponent
}

];
export const PROP_OBJECT_ROUTING: ModuleWithProviders = RouterModule.forChild(PROP_OBJECT_ROUTES);