import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DynamicFormBuilderComponent } from './dynamic-form-builder.component';

const DYNAMIC_FORM_BUILDER_ROUTES: Routes = [
{
	path:'',
	component:DynamicFormBuilderComponent
}
];
export const DYNAMIC_FORM_BUILDER_ROUTING: ModuleWithProviders = RouterModule.forChild(DYNAMIC_FORM_BUILDER_ROUTES);