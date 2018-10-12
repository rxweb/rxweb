import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { GreaterThanEqualToCompleteValidatorComponent } from './complete/greater-than-equal-to-complete.component';
import { GreaterThanEqualToFieldNameValidatorComponent } from './fieldName/greater-than-equal-to-field-name.component';
import { GreaterThanEqualToConditionalExpressionValidatorComponent } from './conditionalExpression/greater-than-equal-to-conditional-expression.component';
import { GreaterThanEqualToMessageValidatorComponent } from './message/greater-than-equal-to-message.component';
import { GreaterThanEqualToDynamicValidatorComponent } from './dynamic/greater-than-equal-to-dynamic.component';
import { GreaterThanEqualToAddValidatorComponent } from './add/greater-than-equal-to-add.component';

@NgModule({
  declarations: [
	GreaterThanEqualToCompleteValidatorComponent,
	GreaterThanEqualToFieldNameValidatorComponent,
	GreaterThanEqualToConditionalExpressionValidatorComponent,
	GreaterThanEqualToMessageValidatorComponent,
	GreaterThanEqualToDynamicValidatorComponent,
	GreaterThanEqualToAddValidatorComponent,
  ],
entryComponents: [
	GreaterThanEqualToCompleteValidatorComponent,
	GreaterThanEqualToFieldNameValidatorComponent,
	GreaterThanEqualToConditionalExpressionValidatorComponent,
	GreaterThanEqualToMessageValidatorComponent,
	GreaterThanEqualToDynamicValidatorComponent,
	GreaterThanEqualToAddValidatorComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	GreaterThanEqualToCompleteValidatorComponent,
	GreaterThanEqualToFieldNameValidatorComponent,
	GreaterThanEqualToConditionalExpressionValidatorComponent,
	GreaterThanEqualToMessageValidatorComponent,
	GreaterThanEqualToDynamicValidatorComponent,
	GreaterThanEqualToAddValidatorComponent,
  ],

})
export class  GreaterThanEqualToExtendedModule { }
