import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const HOWTO_ROUTES: Routes = [
{
	path:'errorMessages',
	loadChildren: './errorMessages/error-messages.module#ErrorMessagesModule',
},
{
	path:'formData',
	loadChildren: './formData/form-data.module#FormDataModule',
},
{
	path:'fileObject',
	loadChildren: './fileObject/file-object.module#FileObjectModule',
},
{
	path:'dirtyCheck',
	loadChildren: './dirtyCheck/dirty-check.module#DirtyCheckModule',
},
{
	path:'resetForm',
	loadChildren: './resetForm/reset-form.module#ResetFormModule',
},
{
	path:'disabled-control-conditionally',
	loadChildren: './disabled-control-conditionally/disabled-control-conditionally.module#Disabled_control_conditionallyModule',
},
{
	path:'conditional-error-messages',
	loadChildren: './conditional-error-messages/conditional-error-messages.module#Conditional_error_messagesModule',
},
];
export const HOWTO_ROUTING: ModuleWithProviders = RouterModule.forChild(HOWTO_ROUTES);