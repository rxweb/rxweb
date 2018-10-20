import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { RangeCompleteValidatorComponent } from './complete/range-complete.component';
import { RangeMinimumNumberValidatorComponent } from './minimumNumber/range-minimum-number.component';
import { RangeMaximumNumberValidatorComponent } from './maximumNumber/range-maximum-number.component';
import { RangeConditionalExpressionValidatorComponent } from './conditionalExpression/range-conditional-expression.component';
import { RangeMessageValidatorComponent } from './message/range-message.component';
import { RangeDynamicValidatorComponent } from './dynamic/range-dynamic.component';
import { RangeAddValidatorComponent } from './add/range-add.component';

@NgModule({
  declarations: [
	RangeCompleteValidatorComponent,
	RangeMinimumNumberValidatorComponent,
	RangeMaximumNumberValidatorComponent,
	RangeConditionalExpressionValidatorComponent,
	RangeMessageValidatorComponent,
	RangeDynamicValidatorComponent,
	RangeAddValidatorComponent,
  ],
entryComponents: [
	RangeCompleteValidatorComponent,
	RangeMinimumNumberValidatorComponent,
	RangeMaximumNumberValidatorComponent,
	RangeConditionalExpressionValidatorComponent,
	RangeMessageValidatorComponent,
	RangeDynamicValidatorComponent,
	RangeAddValidatorComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	RangeCompleteValidatorComponent,
	RangeMinimumNumberValidatorComponent,
	RangeMaximumNumberValidatorComponent,
	RangeConditionalExpressionValidatorComponent,
	RangeMessageValidatorComponent,
	RangeDynamicValidatorComponent,
	RangeAddValidatorComponent,
  ],

})
export class  RangeValidatorsExtendedModule { }
