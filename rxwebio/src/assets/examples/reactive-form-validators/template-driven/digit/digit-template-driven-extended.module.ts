import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { DigitCompleteTemplateDrivenComponent } from './complete/digit-complete.component';
import { DigitConditionalExpressionTemplateDrivenComponent } from './conditionalExpression/digit-conditional-expression.component';
import { DigitMessageTemplateDrivenComponent } from './message/digit-message.component';
import { DigitAddTemplateDrivenComponent } from './add/digit-add.component';

@NgModule({
  declarations: [
	DigitCompleteTemplateDrivenComponent,
	DigitConditionalExpressionTemplateDrivenComponent,
	DigitMessageTemplateDrivenComponent,
	DigitAddTemplateDrivenComponent,
  ],
entryComponents: [
	DigitCompleteTemplateDrivenComponent,
	DigitConditionalExpressionTemplateDrivenComponent,
	DigitMessageTemplateDrivenComponent,
	DigitAddTemplateDrivenComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	DigitCompleteTemplateDrivenComponent,
	DigitConditionalExpressionTemplateDrivenComponent,
	DigitMessageTemplateDrivenComponent,
	DigitAddTemplateDrivenComponent,
  ],

})
export class  DigitTemplateDrivenExtendedModule { }
