import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const ADVANCE_FORM_VALIDATION_ROUTES: Routes = [
{
	path:'conditionalValidation',
	loadChildren: './conditionalValidation/conditional-validation.module#ConditionalValidationModule',
},
];
export const ADVANCE_FORM_VALIDATION_ROUTING: ModuleWithProviders = RouterModule.forChild(ADVANCE_FORM_VALIDATION_ROUTES);