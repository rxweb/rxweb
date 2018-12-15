import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { RequiredCompleteTemplateDrivenValidationDirectivesComponent } from './complete/required-complete.component';
import { RequiredConditionalExpressionTemplateDrivenValidationDirectivesComponent } from './conditionalExpression/required-conditional-expression.component';
import { RequiredMessageTemplateDrivenValidationDirectivesComponent } from './message/required-message.component';
import { RequiredAddTemplateDrivenValidationDirectivesComponent } from './add/required-add.component';

@NgModule({
  declarations: [
	RequiredCompleteTemplateDrivenValidationDirectivesComponent,
	RequiredConditionalExpressionTemplateDrivenValidationDirectivesComponent,
	RequiredMessageTemplateDrivenValidationDirectivesComponent,
	RequiredAddTemplateDrivenValidationDirectivesComponent,
  ],
entryComponents: [
	RequiredCompleteTemplateDrivenValidationDirectivesComponent,
	RequiredConditionalExpressionTemplateDrivenValidationDirectivesComponent,
	RequiredMessageTemplateDrivenValidationDirectivesComponent,
	RequiredAddTemplateDrivenValidationDirectivesComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	RequiredCompleteTemplateDrivenValidationDirectivesComponent,
	RequiredConditionalExpressionTemplateDrivenValidationDirectivesComponent,
	RequiredMessageTemplateDrivenValidationDirectivesComponent,
	RequiredAddTemplateDrivenValidationDirectivesComponent,
  ],

})
export class  RequiredTemplateDrivenValidationDirectivesExtendedModule { }
