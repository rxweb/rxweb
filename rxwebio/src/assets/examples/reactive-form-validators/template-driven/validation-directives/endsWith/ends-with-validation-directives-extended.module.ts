import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { EndsWithCompleteTemplateDrivenValidationDirectivesComponent } from './complete/ends-with-complete.component';
import { EndsWithValueTemplateDrivenValidationDirectivesComponent } from './value/ends-with-value.component';
import { EndsWithConditionalExpressionTemplateDrivenValidationDirectivesComponent } from './conditionalExpression/ends-with-conditional-expression.component';
import { EndsWithMessageTemplateDrivenValidationDirectivesComponent } from './message/ends-with-message.component';
import { EndsWithAddTemplateDrivenValidationDirectivesComponent } from './add/ends-with-add.component';

@NgModule({
  declarations: [
	EndsWithCompleteTemplateDrivenValidationDirectivesComponent,
	EndsWithValueTemplateDrivenValidationDirectivesComponent,
	EndsWithConditionalExpressionTemplateDrivenValidationDirectivesComponent,
	EndsWithMessageTemplateDrivenValidationDirectivesComponent,
	EndsWithAddTemplateDrivenValidationDirectivesComponent,
  ],
entryComponents: [
	EndsWithCompleteTemplateDrivenValidationDirectivesComponent,
	EndsWithValueTemplateDrivenValidationDirectivesComponent,
	EndsWithConditionalExpressionTemplateDrivenValidationDirectivesComponent,
	EndsWithMessageTemplateDrivenValidationDirectivesComponent,
	EndsWithAddTemplateDrivenValidationDirectivesComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	EndsWithCompleteTemplateDrivenValidationDirectivesComponent,
	EndsWithValueTemplateDrivenValidationDirectivesComponent,
	EndsWithConditionalExpressionTemplateDrivenValidationDirectivesComponent,
	EndsWithMessageTemplateDrivenValidationDirectivesComponent,
	EndsWithAddTemplateDrivenValidationDirectivesComponent,
  ],

})
export class  EndsWithTemplateDrivenValidationDirectivesExtendedModule { }
