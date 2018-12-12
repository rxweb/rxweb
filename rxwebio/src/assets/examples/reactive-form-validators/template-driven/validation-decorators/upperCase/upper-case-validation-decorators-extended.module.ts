import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { UpperCaseCompleteTemplateDrivenValidationDecoratorsComponent } from './complete/upper-case-complete.component';
import { UpperCaseConditionalExpressionTemplateDrivenValidationDecoratorsComponent } from './conditionalExpression/upper-case-conditional-expression.component';
import { UpperCaseMessageTemplateDrivenValidationDecoratorsComponent } from './message/upper-case-message.component';
import { UpperCaseAddTemplateDrivenValidationDecoratorsComponent } from './add/upper-case-add.component';

@NgModule({
  declarations: [
	UpperCaseCompleteTemplateDrivenValidationDecoratorsComponent,
	UpperCaseConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	UpperCaseMessageTemplateDrivenValidationDecoratorsComponent,
	UpperCaseAddTemplateDrivenValidationDecoratorsComponent,
  ],
entryComponents: [
	UpperCaseCompleteTemplateDrivenValidationDecoratorsComponent,
	UpperCaseConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	UpperCaseMessageTemplateDrivenValidationDecoratorsComponent,
	UpperCaseAddTemplateDrivenValidationDecoratorsComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	UpperCaseCompleteTemplateDrivenValidationDecoratorsComponent,
	UpperCaseConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	UpperCaseMessageTemplateDrivenValidationDecoratorsComponent,
	UpperCaseAddTemplateDrivenValidationDecoratorsComponent,
  ],

})
export class  UpperCaseTemplateDrivenValidationDecoratorsExtendedModule { }
