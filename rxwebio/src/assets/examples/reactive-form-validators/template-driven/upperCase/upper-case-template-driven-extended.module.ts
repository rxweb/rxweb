import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { UpperCaseCompleteTemplateDrivenComponent } from './complete/upper-case-complete.component';
import { UpperCaseConditionalExpressionTemplateDrivenComponent } from './conditionalExpression/upper-case-conditional-expression.component';
import { UpperCaseMessageTemplateDrivenComponent } from './message/upper-case-message.component';
import { UpperCaseAddTemplateDrivenComponent } from './add/upper-case-add.component';

@NgModule({
  declarations: [
	UpperCaseCompleteTemplateDrivenComponent,
	UpperCaseConditionalExpressionTemplateDrivenComponent,
	UpperCaseMessageTemplateDrivenComponent,
	UpperCaseAddTemplateDrivenComponent,
  ],
entryComponents: [
	UpperCaseCompleteTemplateDrivenComponent,
	UpperCaseConditionalExpressionTemplateDrivenComponent,
	UpperCaseMessageTemplateDrivenComponent,
	UpperCaseAddTemplateDrivenComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	UpperCaseCompleteTemplateDrivenComponent,
	UpperCaseConditionalExpressionTemplateDrivenComponent,
	UpperCaseMessageTemplateDrivenComponent,
	UpperCaseAddTemplateDrivenComponent,
  ],

})
export class  UpperCaseTemplateDrivenExtendedModule { }
