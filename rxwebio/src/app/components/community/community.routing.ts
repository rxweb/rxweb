import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TextPageComponent } from '../text-page/text-page.component';

const COMMUNITY_ROUTES: Routes = [
{
	path:'where_to_start_contributing',
	component:TextPageComponent
},
{
	path:'maintaining',
	component:TextPageComponent
},
{
	path:'contributing',
	component:TextPageComponent
},
{
	path:'commit_guideline',
	component:TextPageComponent
},
];
export const COMMUNITY_ROUTING: ModuleWithProviders = RouterModule.forChild(COMMUNITY_ROUTES);