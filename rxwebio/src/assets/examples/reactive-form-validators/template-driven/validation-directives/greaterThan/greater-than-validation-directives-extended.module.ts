import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { GreaterThanCompleteTemplateDrivenValidationDirectivesComponent } from './complete/greater-than-complete.component';
import { GreaterThanFieldNameTemplateDrivenValidationDirectivesComponent } from './fieldName/greater-than-field-name.component';
import { GreaterThanConditionalExpressionTemplateDrivenValidationDirectivesComponent } from './conditionalExpression/greater-than-conditional-expression.component';
import { GreaterThanMessageTemplateDrivenValidationDirectivesComponent } from './message/greater-than-message.component';
import { GreaterThanAddTemplateDrivenValidationDirectivesComponent } from './add/greater-than-add.component';

@NgModule({
  declarations: [
	GreaterThanCompleteTemplateDrivenValidationDirectivesComponent,
	GreaterThanFieldNameTemplateDrivenValidationDirectivesComponent,
	GreaterThanConditionalExpressionTemplateDrivenValidationDirectivesComponent,
	GreaterThanMessageTemplateDrivenValidationDirectivesComponent,
	GreaterThanAddTemplateDrivenValidationDirectivesComponent,
  ],
entryComponents: [
	GreaterThanCompleteTemplateDrivenValidationDirectivesComponent,
	GreaterThanFieldNameTemplateDrivenValidationDirectivesComponent,
	GreaterThanConditionalExpressionTemplateDrivenValidationDirectivesComponent,
	GreaterThanMessageTemplateDrivenValidationDirectivesComponent,
	GreaterThanAddTemplateDrivenValidationDirectivesComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	GreaterThanCompleteTemplateDrivenValidationDirectivesComponent,
	GreaterThanFieldNameTemplateDrivenValidationDirectivesComponent,
	GreaterThanConditionalExpressionTemplateDrivenValidationDirectivesComponent,
	GreaterThanMessageTemplateDrivenValidationDirectivesComponent,
	GreaterThanAddTemplateDrivenValidationDirectivesComponent,
  ],

})
export class  GreaterThanTemplateDrivenValidationDirectivesExtendedModule { }
