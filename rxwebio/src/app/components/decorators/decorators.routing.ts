import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const DECORATORS_ROUTES: Routes = [
{
	path:'prop',
	loadChildren: './prop/prop.module#PropModule',
},
{
	path:'propArray',
	loadChildren: './propArray/prop-array.module#PropArrayModule',
},
{
	path:'propObject',
	loadChildren: './propObject/prop-object.module#PropObjectModule',
},
{
	path:'disabledControlConditionally',
	loadChildren: './disabledControlConditionally/disabled-control-conditionally.module#DisabledControlConditionallyModule',
},
{
	path:'showErrorMessagesSubmit',
	loadChildren: './showErrorMessagesSubmit/show-error-messages-submit.module#ShowErrorMessagesSubmitModule',
},
];
export const DECORATORS_ROUTING: ModuleWithProviders = RouterModule.forChild(DECORATORS_ROUTES);