import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { GreaterThanEqualToCompleteTemplateDrivenValidationDirectivesComponent } from './complete/greater-than-equal-to-complete.component';
import { GreaterThanEqualToFieldNameTemplateDrivenValidationDirectivesComponent } from './fieldName/greater-than-equal-to-field-name.component';
import { GreaterThanEqualToConditionalExpressionTemplateDrivenValidationDirectivesComponent } from './conditionalExpression/greater-than-equal-to-conditional-expression.component';
import { GreaterThanEqualToMessageTemplateDrivenValidationDirectivesComponent } from './message/greater-than-equal-to-message.component';
import { GreaterThanEqualToAddTemplateDrivenValidationDirectivesComponent } from './add/greater-than-equal-to-add.component';

@NgModule({
  declarations: [
	GreaterThanEqualToCompleteTemplateDrivenValidationDirectivesComponent,
	GreaterThanEqualToFieldNameTemplateDrivenValidationDirectivesComponent,
	GreaterThanEqualToConditionalExpressionTemplateDrivenValidationDirectivesComponent,
	GreaterThanEqualToMessageTemplateDrivenValidationDirectivesComponent,
	GreaterThanEqualToAddTemplateDrivenValidationDirectivesComponent,
  ],
entryComponents: [
	GreaterThanEqualToCompleteTemplateDrivenValidationDirectivesComponent,
	GreaterThanEqualToFieldNameTemplateDrivenValidationDirectivesComponent,
	GreaterThanEqualToConditionalExpressionTemplateDrivenValidationDirectivesComponent,
	GreaterThanEqualToMessageTemplateDrivenValidationDirectivesComponent,
	GreaterThanEqualToAddTemplateDrivenValidationDirectivesComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	GreaterThanEqualToCompleteTemplateDrivenValidationDirectivesComponent,
	GreaterThanEqualToFieldNameTemplateDrivenValidationDirectivesComponent,
	GreaterThanEqualToConditionalExpressionTemplateDrivenValidationDirectivesComponent,
	GreaterThanEqualToMessageTemplateDrivenValidationDirectivesComponent,
	GreaterThanEqualToAddTemplateDrivenValidationDirectivesComponent,
  ],

})
export class  GreaterThanEqualToTemplateDrivenValidationDirectivesExtendedModule { }
