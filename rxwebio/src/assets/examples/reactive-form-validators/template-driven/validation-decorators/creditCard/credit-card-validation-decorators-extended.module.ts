import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { CreditCardCompleteTemplateDrivenValidationDecoratorsComponent } from './complete/credit-card-complete.component';
import { CreditCardFieldNameTemplateDrivenValidationDecoratorsComponent } from './fieldName/credit-card-field-name.component';
import { CreditCardConditionalExpressionTemplateDrivenValidationDecoratorsComponent } from './conditionalExpression/credit-card-conditional-expression.component';
import { CreditCardMessageTemplateDrivenValidationDecoratorsComponent } from './message/credit-card-message.component';
import { CreditCardAddTemplateDrivenValidationDecoratorsComponent } from './add/credit-card-add.component';

@NgModule({
  declarations: [
	CreditCardCompleteTemplateDrivenValidationDecoratorsComponent,
	CreditCardFieldNameTemplateDrivenValidationDecoratorsComponent,
	CreditCardConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	CreditCardMessageTemplateDrivenValidationDecoratorsComponent,
	CreditCardAddTemplateDrivenValidationDecoratorsComponent,
  ],
entryComponents: [
	CreditCardCompleteTemplateDrivenValidationDecoratorsComponent,
	CreditCardFieldNameTemplateDrivenValidationDecoratorsComponent,
	CreditCardConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	CreditCardMessageTemplateDrivenValidationDecoratorsComponent,
	CreditCardAddTemplateDrivenValidationDecoratorsComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	CreditCardCompleteTemplateDrivenValidationDecoratorsComponent,
	CreditCardFieldNameTemplateDrivenValidationDecoratorsComponent,
	CreditCardConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	CreditCardMessageTemplateDrivenValidationDecoratorsComponent,
	CreditCardAddTemplateDrivenValidationDecoratorsComponent,
  ],

})
export class  CreditCardTemplateDrivenValidationDecoratorsExtendedModule { }
