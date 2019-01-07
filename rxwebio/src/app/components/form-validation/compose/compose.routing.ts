import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageComponent } from "src/app/components/page/page.component";
const COMPOSE_ROUTES: Routes = [
{
	path:':typeName',
	component:PageComponent
}

];
export const COMPOSE_ROUTING: ModuleWithProviders = RouterModule.forChild(COMPOSE_ROUTES);