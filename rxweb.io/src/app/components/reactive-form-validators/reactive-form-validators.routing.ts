import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const REACTIVE_FORM_VALIDATORS_ROUTES: Routes = [
{
	path:'alpha',
	loadChildren: './alpha/alpha.module#AlphaModule',
}
 ];

export const REACTIVE_FORM_VALIDATORS_ROUTING: ModuleWithProviders = RouterModule.forChild(REACTIVE_FORM_VALIDATORS_ROUTES);
