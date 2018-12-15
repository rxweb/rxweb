import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { StartsWithCompleteValidatorComponent } from './complete/starts-with-complete.component';
import { StartsWithValueValidatorComponent } from './value/starts-with-value.component';
import { StartsWithConditionalExpressionValidatorComponent } from './conditionalExpression/starts-with-conditional-expression.component';
import { StartsWithMessageValidatorComponent } from './message/starts-with-message.component';
import { StartsWithDynamicValidatorComponent } from './dynamic/starts-with-dynamic.component';
import { StartsWithAddValidatorComponent } from './add/starts-with-add.component';

@NgModule({
  declarations: [
	StartsWithCompleteValidatorComponent,
	StartsWithValueValidatorComponent,
	StartsWithConditionalExpressionValidatorComponent,
	StartsWithMessageValidatorComponent,
	StartsWithDynamicValidatorComponent,
	StartsWithAddValidatorComponent,
  ],
entryComponents: [
	StartsWithCompleteValidatorComponent,
	StartsWithValueValidatorComponent,
	StartsWithConditionalExpressionValidatorComponent,
	StartsWithMessageValidatorComponent,
	StartsWithDynamicValidatorComponent,
	StartsWithAddValidatorComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	StartsWithCompleteValidatorComponent,
	StartsWithValueValidatorComponent,
	StartsWithConditionalExpressionValidatorComponent,
	StartsWithMessageValidatorComponent,
	StartsWithDynamicValidatorComponent,
	StartsWithAddValidatorComponent,
  ],

})
export class  StartsWithValidatorsExtendedModule { }
