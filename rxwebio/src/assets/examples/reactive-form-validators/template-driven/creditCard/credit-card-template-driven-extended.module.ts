import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { CreditCardCompleteTemplateDrivenComponent } from './complete/credit-card-complete.component';
import { CreditCardFieldNameTemplateDrivenComponent } from './fieldName/credit-card-field-name.component';
import { CreditCardConditionalExpressionTemplateDrivenComponent } from './conditionalExpression/credit-card-conditional-expression.component';
import { CreditCardMessageTemplateDrivenComponent } from './message/credit-card-message.component';
import { CreditCardAddTemplateDrivenComponent } from './add/credit-card-add.component';

@NgModule({
  declarations: [
	CreditCardCompleteTemplateDrivenComponent,
	CreditCardFieldNameTemplateDrivenComponent,
	CreditCardConditionalExpressionTemplateDrivenComponent,
	CreditCardMessageTemplateDrivenComponent,
	CreditCardAddTemplateDrivenComponent,
  ],
entryComponents: [
	CreditCardCompleteTemplateDrivenComponent,
	CreditCardFieldNameTemplateDrivenComponent,
	CreditCardConditionalExpressionTemplateDrivenComponent,
	CreditCardMessageTemplateDrivenComponent,
	CreditCardAddTemplateDrivenComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	CreditCardCompleteTemplateDrivenComponent,
	CreditCardFieldNameTemplateDrivenComponent,
	CreditCardConditionalExpressionTemplateDrivenComponent,
	CreditCardMessageTemplateDrivenComponent,
	CreditCardAddTemplateDrivenComponent,
  ],

})
export class  CreditCardTemplateDrivenExtendedModule { }
