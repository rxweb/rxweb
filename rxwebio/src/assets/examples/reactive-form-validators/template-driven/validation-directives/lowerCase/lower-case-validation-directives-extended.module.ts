import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { LowerCaseCompleteTemplateDrivenValidationDirectivesComponent } from './complete/lower-case-complete.component';
import { LowerCaseConditionalExpressionTemplateDrivenValidationDirectivesComponent } from './conditionalExpression/lower-case-conditional-expression.component';
import { LowerCaseMessageTemplateDrivenValidationDirectivesComponent } from './message/lower-case-message.component';
import { LowerCaseAddTemplateDrivenValidationDirectivesComponent } from './add/lower-case-add.component';

@NgModule({
  declarations: [
	LowerCaseCompleteTemplateDrivenValidationDirectivesComponent,
	LowerCaseConditionalExpressionTemplateDrivenValidationDirectivesComponent,
	LowerCaseMessageTemplateDrivenValidationDirectivesComponent,
	LowerCaseAddTemplateDrivenValidationDirectivesComponent,
  ],
entryComponents: [
	LowerCaseCompleteTemplateDrivenValidationDirectivesComponent,
	LowerCaseConditionalExpressionTemplateDrivenValidationDirectivesComponent,
	LowerCaseMessageTemplateDrivenValidationDirectivesComponent,
	LowerCaseAddTemplateDrivenValidationDirectivesComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	LowerCaseCompleteTemplateDrivenValidationDirectivesComponent,
	LowerCaseConditionalExpressionTemplateDrivenValidationDirectivesComponent,
	LowerCaseMessageTemplateDrivenValidationDirectivesComponent,
	LowerCaseAddTemplateDrivenValidationDirectivesComponent,
  ],

})
export class  LowerCaseTemplateDrivenValidationDirectivesExtendedModule { }
