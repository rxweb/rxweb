import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageComponent } from "src/app/components/form-validation/page/page.component";
const CREDIT_CARD_ROUTES: Routes = [
{
	path:':typeName',
	component:PageComponent
}
];
export const CREDIT_CARD_ROUTING: ModuleWithProviders = RouterModule.forChild(CREDIT_CARD_ROUTES);