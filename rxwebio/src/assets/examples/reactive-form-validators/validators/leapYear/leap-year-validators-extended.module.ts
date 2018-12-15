import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { LeapYearCompleteValidatorComponent } from './complete/leap-year-complete.component';
import { LeapYearConditionalExpressionValidatorComponent } from './conditionalExpression/leap-year-conditional-expression.component';
import { LeapYearMessageValidatorComponent } from './message/leap-year-message.component';
import { LeapYearDynamicValidatorComponent } from './dynamic/leap-year-dynamic.component';
import { LeapYearAddValidatorComponent } from './add/leap-year-add.component';

@NgModule({
  declarations: [
	LeapYearCompleteValidatorComponent,
	LeapYearConditionalExpressionValidatorComponent,
	LeapYearMessageValidatorComponent,
	LeapYearDynamicValidatorComponent,
	LeapYearAddValidatorComponent,
  ],
entryComponents: [
	LeapYearCompleteValidatorComponent,
	LeapYearConditionalExpressionValidatorComponent,
	LeapYearMessageValidatorComponent,
	LeapYearDynamicValidatorComponent,
	LeapYearAddValidatorComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	LeapYearCompleteValidatorComponent,
	LeapYearConditionalExpressionValidatorComponent,
	LeapYearMessageValidatorComponent,
	LeapYearDynamicValidatorComponent,
	LeapYearAddValidatorComponent,
  ],

})
export class  LeapYearValidatorsExtendedModule { }
