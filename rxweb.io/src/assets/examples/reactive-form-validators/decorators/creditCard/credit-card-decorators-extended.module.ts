import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { CreditCardCompleteComponent } from './complete/credit-card-complete.component';
import { CreditCardFieldNameComponent } from './fieldName/credit-card-field-name.component';
import { CreditCardConditionalExpressionComponent } from './conditionalExpression/credit-card-conditional-expression.component';
import { CreditCardMessageComponent } from './message/credit-card-message.component';
import { CreditCardDynamicComponent } from './dynamic/credit-card-dynamic.component';
import { CreditCardAddComponent } from './add/credit-card-add.component';
import { CreditCardEditComponent } from './edit/credit-card-edit.component';

@NgModule({
  declarations: [
	CreditCardCompleteComponent,
	CreditCardFieldNameComponent,
	CreditCardConditionalExpressionComponent,
	CreditCardMessageComponent,
	CreditCardDynamicComponent,
	CreditCardAddComponent,
	CreditCardEditComponent,
  ],
entryComponents: [
	CreditCardCompleteComponent,
	CreditCardFieldNameComponent,
	CreditCardConditionalExpressionComponent,
	CreditCardMessageComponent,
	CreditCardDynamicComponent,
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
	CreditCardFieldNameComponent,
	CreditCardConditionalExpressionComponent,
	CreditCardMessageComponent,
	CreditCardDynamicComponent,
	CreditCardAddComponent,
	CreditCardEditComponent,
  ],

})
export class  CreditCardDecoratorsExtendedModule { }
