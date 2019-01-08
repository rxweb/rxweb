import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageComponent } from "src/app/components/page/page.component";
const IMAGE_ROUTES: Routes = [
{
	path:':typeName',
	component:PageComponent
}

];
export const IMAGE_ROUTING: ModuleWithProviders = RouterModule.forChild(IMAGE_ROUTES);