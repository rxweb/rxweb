import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { CreditCardCompleteComponent } from './complete/credit-card-complete.component';
import { CreditCardCreditCardTypesComponent } from './creditCardTypes/credit-card-credit-card-types.component';
import { CreditCardConditionalExpressionComponent } from './conditionalExpression/credit-card-conditional-expression.component';
import { CreditCardMessageComponent } from './message/credit-card-message.component';
import { CreditCardAddComponent } from './add/credit-card-add.component';
import { CreditCardEditComponent } from './edit/credit-card-edit.component';

@NgModule({
  declarations: [
	CreditCardCompleteComponent,
	CreditCardCreditCardTypesComponent,
	CreditCardConditionalExpressionComponent,
	CreditCardMessageComponent,
	CreditCardAddComponent,
	CreditCardEditComponent,
  ],
entryComponents: [
	CreditCardCompleteComponent,
	CreditCardCreditCardTypesComponent,
	CreditCardConditionalExpressionComponent,
	CreditCardMessageComponent,
	CreditCardAddComponent,
	CreditCardEditComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	CreditCardCompleteComponent,
	CreditCardCreditCardTypesComponent,
	CreditCardConditionalExpressionComponent,
	CreditCardMessageComponent,
	CreditCardAddComponent,
	CreditCardEditComponent,
  ],

})
export class  CreditCardExtendedModule { }
