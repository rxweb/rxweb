import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { LatitudeCompleteTemplateDrivenComponent } from './complete/latitude-complete.component';
import { LatitudeConditionalExpressionTemplateDrivenComponent } from './conditionalExpression/latitude-conditional-expression.component';
import { LatitudeMessageTemplateDrivenComponent } from './message/latitude-message.component';
import { LatitudeAddTemplateDrivenComponent } from './add/latitude-add.component';

@NgModule({
  declarations: [
	LatitudeCompleteTemplateDrivenComponent,
	LatitudeConditionalExpressionTemplateDrivenComponent,
	LatitudeMessageTemplateDrivenComponent,
	LatitudeAddTemplateDrivenComponent,
  ],
entryComponents: [
	LatitudeCompleteTemplateDrivenComponent,
	LatitudeConditionalExpressionTemplateDrivenComponent,
	LatitudeMessageTemplateDrivenComponent,
	LatitudeAddTemplateDrivenComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	LatitudeCompleteTemplateDrivenComponent,
	LatitudeConditionalExpressionTemplateDrivenComponent,
	LatitudeMessageTemplateDrivenComponent,
	LatitudeAddTemplateDrivenComponent,
  ],

})
export class  LatitudeTemplateDrivenExtendedModule { }
