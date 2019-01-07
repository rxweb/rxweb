import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageComponent } from "src/app/components/page/page.component";
const PATTERN_ROUTES: Routes = [
{
	path:':typeName',
	component:PageComponent
}

];
export const PATTERN_ROUTING: ModuleWithProviders = RouterModule.forChild(PATTERN_ROUTES);