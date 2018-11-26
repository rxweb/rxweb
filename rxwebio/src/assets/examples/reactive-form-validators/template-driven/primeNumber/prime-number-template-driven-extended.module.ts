import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { PrimeNumberCompleteTemplateDrivenComponent } from './complete/prime-number-complete.component';
import { PrimeNumberConditionalExpressionTemplateDrivenComponent } from './conditionalExpression/prime-number-conditional-expression.component';
import { PrimeNumberMessageTemplateDrivenComponent } from './message/prime-number-message.component';
import { PrimeNumberAddTemplateDrivenComponent } from './add/prime-number-add.component';

@NgModule({
  declarations: [
	PrimeNumberCompleteTemplateDrivenComponent,
	PrimeNumberConditionalExpressionTemplateDrivenComponent,
	PrimeNumberMessageTemplateDrivenComponent,
	PrimeNumberAddTemplateDrivenComponent,
  ],
entryComponents: [
	PrimeNumberCompleteTemplateDrivenComponent,
	PrimeNumberConditionalExpressionTemplateDrivenComponent,
	PrimeNumberMessageTemplateDrivenComponent,
	PrimeNumberAddTemplateDrivenComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	PrimeNumberCompleteTemplateDrivenComponent,
	PrimeNumberConditionalExpressionTemplateDrivenComponent,
	PrimeNumberMessageTemplateDrivenComponent,
	PrimeNumberAddTemplateDrivenComponent,
  ],

})
export class  PrimeNumberTemplateDrivenExtendedModule { }
