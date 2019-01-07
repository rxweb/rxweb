import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageComponent } from "src/app/components/page/page.component";
const ODD_ROUTES: Routes = [
{
	path:':typeName',
	component:PageComponent
}

];
export const ODD_ROUTING: ModuleWithProviders = RouterModule.forChild(ODD_ROUTES);