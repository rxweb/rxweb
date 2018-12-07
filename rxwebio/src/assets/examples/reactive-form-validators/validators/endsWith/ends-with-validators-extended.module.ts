import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { EndsWithCompleteValidatorComponent } from './complete/ends-with-complete.component';
import { EndsWithValueValidatorComponent } from './value/ends-with-value.component';
import { EndsWithConditionalExpressionValidatorComponent } from './conditionalExpression/ends-with-conditional-expression.component';
import { EndsWithMessageValidatorComponent } from './message/ends-with-message.component';
import { EndsWithDynamicValidatorComponent } from './dynamic/ends-with-dynamic.component';
import { EndsWithAddValidatorComponent } from './add/ends-with-add.component';

@NgModule({
  declarations: [
	EndsWithCompleteValidatorComponent,
	EndsWithValueValidatorComponent,
	EndsWithConditionalExpressionValidatorComponent,
	EndsWithMessageValidatorComponent,
	EndsWithDynamicValidatorComponent,
	EndsWithAddValidatorComponent,
  ],
entryComponents: [
	EndsWithCompleteValidatorComponent,
	EndsWithValueValidatorComponent,
	EndsWithConditionalExpressionValidatorComponent,
	EndsWithMessageValidatorComponent,
	EndsWithDynamicValidatorComponent,
	EndsWithAddValidatorComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	EndsWithCompleteValidatorComponent,
	EndsWithValueValidatorComponent,
	EndsWithConditionalExpressionValidatorComponent,
	EndsWithMessageValidatorComponent,
	EndsWithDynamicValidatorComponent,
	EndsWithAddValidatorComponent,
  ],

})
export class  EndsWithValidatorsExtendedModule { }
