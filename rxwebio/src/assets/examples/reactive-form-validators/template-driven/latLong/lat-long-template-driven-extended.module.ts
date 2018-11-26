import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { LatLongCompleteTemplateDrivenComponent } from './complete/lat-long-complete.component';
import { LatLongConditionalExpressionTemplateDrivenComponent } from './conditionalExpression/lat-long-conditional-expression.component';
import { LatLongMessageTemplateDrivenComponent } from './message/lat-long-message.component';
import { LatLongAddTemplateDrivenComponent } from './add/lat-long-add.component';

@NgModule({
  declarations: [
	LatLongCompleteTemplateDrivenComponent,
	LatLongConditionalExpressionTemplateDrivenComponent,
	LatLongMessageTemplateDrivenComponent,
	LatLongAddTemplateDrivenComponent,
  ],
entryComponents: [
	LatLongCompleteTemplateDrivenComponent,
	LatLongConditionalExpressionTemplateDrivenComponent,
	LatLongMessageTemplateDrivenComponent,
	LatLongAddTemplateDrivenComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	LatLongCompleteTemplateDrivenComponent,
	LatLongConditionalExpressionTemplateDrivenComponent,
	LatLongMessageTemplateDrivenComponent,
	LatLongAddTemplateDrivenComponent,
  ],

})
export class  LatLongTemplateDrivenExtendedModule { }
