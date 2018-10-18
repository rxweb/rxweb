import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { PrimeNumberCompleteComponent } from './complete/prime-number-complete.component';
import { PrimeNumberConditionalExpressionComponent } from './conditionalExpression/prime-number-conditional-expression.component';
import { PrimeNumberMessageComponent } from './message/prime-number-message.component';
import { PrimeNumberDynamicComponent } from './dynamic/prime-number-dynamic.component';
import { PrimeNumberAddComponent } from './add/prime-number-add.component';
import { PrimeNumberEditComponent } from './edit/prime-number-edit.component';

@NgModule({
  declarations: [
	PrimeNumberCompleteComponent,
	PrimeNumberConditionalExpressionComponent,
	PrimeNumberMessageComponent,
	PrimeNumberDynamicComponent,
	PrimeNumberAddComponent,
	PrimeNumberEditComponent,
  ],
entryComponents: [
	PrimeNumberCompleteComponent,
	PrimeNumberConditionalExpressionComponent,
	PrimeNumberMessageComponent,
	PrimeNumberDynamicComponent,
	PrimeNumberAddComponent,
	PrimeNumberEditComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	PrimeNumberCompleteComponent,
	PrimeNumberConditionalExpressionComponent,
	PrimeNumberMessageComponent,
	PrimeNumberDynamicComponent,
	PrimeNumberAddComponent,
	PrimeNumberEditComponent,
  ],

})
export class  PrimeNumberExtendedModule { }
