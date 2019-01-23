import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageComponent } from "src/app/components/page/page.component";
const CONDITIONAL_VALIDATION_ROUTES: Routes = [
{
	path:':typeName',
	component:PageComponent
}

];
export const CONDITIONAL_VALIDATION_ROUTING: ModuleWithProviders = RouterModule.forChild(CONDITIONAL_VALIDATION_ROUTES);