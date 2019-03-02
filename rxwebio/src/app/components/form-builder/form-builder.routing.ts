import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormBuilderComponent } from './form-builder.component';

const FORM_BUILDER_ROUTES: Routes = [
{
	path:'',
	component:FormBuilderComponent
},

];
export const FORM_BUILDER_ROUTING: ModuleWithProviders = RouterModule.forChild(FORM_BUILDER_ROUTES);