import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { UpperCaseCompleteTemplateDrivenValidationDirectivesComponent } from './complete/upper-case-complete.component';
import { UpperCaseConditionalExpressionTemplateDrivenValidationDirectivesComponent } from './conditionalExpression/upper-case-conditional-expression.component';
import { UpperCaseMessageTemplateDrivenValidationDirectivesComponent } from './message/upper-case-message.component';
import { UpperCaseAddTemplateDrivenValidationDirectivesComponent } from './add/upper-case-add.component';

@NgModule({
  declarations: [
	UpperCaseCompleteTemplateDrivenValidationDirectivesComponent,
	UpperCaseConditionalExpressionTemplateDrivenValidationDirectivesComponent,
	UpperCaseMessageTemplateDrivenValidationDirectivesComponent,
	UpperCaseAddTemplateDrivenValidationDirectivesComponent,
  ],
entryComponents: [
	UpperCaseCompleteTemplateDrivenValidationDirectivesComponent,
	UpperCaseConditionalExpressionTemplateDrivenValidationDirectivesComponent,
	UpperCaseMessageTemplateDrivenValidationDirectivesComponent,
	UpperCaseAddTemplateDrivenValidationDirectivesComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	UpperCaseCompleteTemplateDrivenValidationDirectivesComponent,
	UpperCaseConditionalExpressionTemplateDrivenValidationDirectivesComponent,
	UpperCaseMessageTemplateDrivenValidationDirectivesComponent,
	UpperCaseAddTemplateDrivenValidationDirectivesComponent,
  ],

})
export class  UpperCaseTemplateDrivenValidationDirectivesExtendedModule { }
