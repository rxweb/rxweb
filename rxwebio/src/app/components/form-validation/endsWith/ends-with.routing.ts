import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageComponent } from "src/app/components/page/page.component";
const ENDS_WITH_ROUTES: Routes = [
{
	path:':typeName',
	component:PageComponent
}

];
export const ENDS_WITH_ROUTING: ModuleWithProviders = RouterModule.forChild(ENDS_WITH_ROUTES);