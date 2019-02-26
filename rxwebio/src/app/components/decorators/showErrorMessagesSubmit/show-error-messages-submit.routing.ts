import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageComponent } from "src/app/components/page/page.component";
const SHOW_ERROR_MESSAGES_SUBMIT_ROUTES: Routes = [
{
	path:':typeName/:templateDrivenType',
	component:PageComponent
},
{
	path:':typeName',
	component:PageComponent
}

];
export const SHOW_ERROR_MESSAGES_SUBMIT_ROUTING: ModuleWithProviders = RouterModule.forChild(SHOW_ERROR_MESSAGES_SUBMIT_ROUTES);