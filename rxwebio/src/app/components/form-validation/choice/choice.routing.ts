import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageComponent } from "src/app/components/page/page.component";
const CHOICE_ROUTES: Routes = [
{
	path:':typeName',
	component:PageComponent
}

];
export const CHOICE_ROUTING: ModuleWithProviders = RouterModule.forChild(CHOICE_ROUTES);