import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageComponent } from "src/app/components/page/page.component";
const RULE_ROUTES: Routes = [
{
	path:':typeName',
	component:PageComponent
}

];
export const RULE_ROUTING: ModuleWithProviders = RouterModule.forChild(RULE_ROUTES);