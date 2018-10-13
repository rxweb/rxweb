import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { MinLengthCompleteValidatorComponent } from './complete/min-length-complete.component';
import { MinLengthValueValidatorComponent } from './value/min-length-value.component';
import { MinLengthMessageValidatorComponent } from './message/min-length-message.component';
import { MinLengthConditionalExpressionValidatorComponent } from './conditionalExpression/min-length-conditional-expression.component';
import { MinLengthDynamicValidatorComponent } from './dynamic/min-length-dynamic.component';
import { MinLengthAddValidatorComponent } from './add/min-length-add.component';

@NgModule({
  declarations: [
	MinLengthCompleteValidatorComponent,
	MinLengthValueValidatorComponent,
	MinLengthMessageValidatorComponent,
	MinLengthConditionalExpressionValidatorComponent,
	MinLengthDynamicValidatorComponent,
	MinLengthAddValidatorComponent,
  ],
entryComponents: [
	MinLengthCompleteValidatorComponent,
	MinLengthValueValidatorComponent,
	MinLengthMessageValidatorComponent,
	MinLengthConditionalExpressionValidatorComponent,
	MinLengthDynamicValidatorComponent,
	MinLengthAddValidatorComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	MinLengthCompleteValidatorComponent,
	MinLengthValueValidatorComponent,
	MinLengthMessageValidatorComponent,
	MinLengthConditionalExpressionValidatorComponent,
	MinLengthDynamicValidatorComponent,
	MinLengthAddValidatorComponent,
  ],

})
export class  MinLengthExtendedModule { }
