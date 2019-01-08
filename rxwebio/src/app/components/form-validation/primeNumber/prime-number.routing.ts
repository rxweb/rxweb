import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageComponent } from "src/app/components/page/page.component";
const PRIME_NUMBER_ROUTES: Routes = [
{
	path:':typeName',
	component:PageComponent
}

];
export const PRIME_NUMBER_ROUTING: ModuleWithProviders = RouterModule.forChild(PRIME_NUMBER_ROUTES);