import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { CreditCardCompleteValidatorComponent } from './complete/credit-card-complete.component';
import { CreditCardFieldNameValidatorComponent } from './fieldName/credit-card-field-name.component';
import { CreditCardConditionalExpressionValidatorComponent } from './conditionalExpression/credit-card-conditional-expression.component';
import { CreditCardMessageValidatorComponent } from './message/credit-card-message.component';
import { CreditCardDynamicValidatorComponent } from './dynamic/credit-card-dynamic.component';
import { CreditCardAddValidatorComponent } from './add/credit-card-add.component';

@NgModule({
  declarations: [
	CreditCardCompleteValidatorComponent,
	CreditCardFieldNameValidatorComponent,
	CreditCardConditionalExpressionValidatorComponent,
	CreditCardMessageValidatorComponent,
	CreditCardDynamicValidatorComponent,
	CreditCardAddValidatorComponent,
  ],
entryComponents: [
	CreditCardCompleteValidatorComponent,
	CreditCardFieldNameValidatorComponent,
	CreditCardConditionalExpressionValidatorComponent,
	CreditCardMessageValidatorComponent,
	CreditCardDynamicValidatorComponent,
	CreditCardAddValidatorComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	CreditCardCompleteValidatorComponent,
	CreditCardFieldNameValidatorComponent,
	CreditCardConditionalExpressionValidatorComponent,
	CreditCardMessageValidatorComponent,
	CreditCardDynamicValidatorComponent,
	CreditCardAddValidatorComponent,
  ],

})
export class  CreditCardValidatorsExtendedModule { }
