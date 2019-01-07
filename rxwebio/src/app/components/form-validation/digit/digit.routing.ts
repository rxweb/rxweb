import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageComponent } from "src/app/components/page/page.component";
const DIGIT_ROUTES: Routes = [
{
	path:':typeName',
	component:PageComponent
}

];
export const DIGIT_ROUTING: ModuleWithProviders = RouterModule.forChild(DIGIT_ROUTES);