import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { CreditCardCompleteTemplateDrivenValidationDirectivesComponent } from './complete/credit-card-complete.component';
import { CreditCardFieldNameTemplateDrivenValidationDirectivesComponent } from './fieldName/credit-card-field-name.component';
import { CreditCardConditionalExpressionTemplateDrivenValidationDirectivesComponent } from './conditionalExpression/credit-card-conditional-expression.component';
import { CreditCardMessageTemplateDrivenValidationDirectivesComponent } from './message/credit-card-message.component';
import { CreditCardAddTemplateDrivenValidationDirectivesComponent } from './add/credit-card-add.component';

@NgModule({
  declarations: [
	CreditCardCompleteTemplateDrivenValidationDirectivesComponent,
	CreditCardFieldNameTemplateDrivenValidationDirectivesComponent,
	CreditCardConditionalExpressionTemplateDrivenValidationDirectivesComponent,
	CreditCardMessageTemplateDrivenValidationDirectivesComponent,
	CreditCardAddTemplateDrivenValidationDirectivesComponent,
  ],
entryComponents: [
	CreditCardCompleteTemplateDrivenValidationDirectivesComponent,
	CreditCardFieldNameTemplateDrivenValidationDirectivesComponent,
	CreditCardConditionalExpressionTemplateDrivenValidationDirectivesComponent,
	CreditCardMessageTemplateDrivenValidationDirectivesComponent,
	CreditCardAddTemplateDrivenValidationDirectivesComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	CreditCardCompleteTemplateDrivenValidationDirectivesComponent,
	CreditCardFieldNameTemplateDrivenValidationDirectivesComponent,
	CreditCardConditionalExpressionTemplateDrivenValidationDirectivesComponent,
	CreditCardMessageTemplateDrivenValidationDirectivesComponent,
	CreditCardAddTemplateDrivenValidationDirectivesComponent,
  ],

})
export class  CreditCardTemplateDrivenValidationDirectivesExtendedModule { }
