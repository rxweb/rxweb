import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { RichFormComponent } from './rich-form.component';

export const appRoutes: Routes = [
  { path: '', component: RichFormComponent }
];
@NgModule({
  imports: [
    RouterModule.forChild(appRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
  ]
})
export class RichFormFeatureRouterModule {}
