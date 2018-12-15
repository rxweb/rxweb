import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { TimeCompleteValidatorComponent } from './complete/time-complete.component';
import { TimeConditionalExpressionValidatorComponent } from './conditionalExpression/time-conditional-expression.component';
import { TimeAllowSecondsValidatorComponent } from './allowSeconds/time-allow-seconds.component';
import { TimeMessageValidatorComponent } from './message/time-message.component';
import { TimeDynamicValidatorComponent } from './dynamic/time-dynamic.component';
import { TimeAddValidatorComponent } from './add/time-add.component';

@NgModule({
  declarations: [
	TimeCompleteValidatorComponent,
	TimeConditionalExpressionValidatorComponent,
	TimeAllowSecondsValidatorComponent,
	TimeMessageValidatorComponent,
	TimeDynamicValidatorComponent,
	TimeAddValidatorComponent,
  ],
entryComponents: [
	TimeCompleteValidatorComponent,
	TimeConditionalExpressionValidatorComponent,
	TimeAllowSecondsValidatorComponent,
	TimeMessageValidatorComponent,
	TimeDynamicValidatorComponent,
	TimeAddValidatorComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	TimeCompleteValidatorComponent,
	TimeConditionalExpressionValidatorComponent,
	TimeAllowSecondsValidatorComponent,
	TimeMessageValidatorComponent,
	TimeDynamicValidatorComponent,
	TimeAddValidatorComponent,
  ],

})
export class  TimeValidatorsExtendedModule { }
