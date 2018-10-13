import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { MaxLengthCompleteValidatorComponent } from './complete/max-length-complete.component';
import { MaxLengthValueValidatorComponent } from './value/max-length-value.component';
import { MaxLengthConditionalExpressionValidatorComponent } from './conditionalExpression/max-length-conditional-expression.component';
import { MaxLengthMessageValidatorComponent } from './message/max-length-message.component';
import { MaxLengthDynamicValidatorComponent } from './dynamic/max-length-dynamic.component';
import { MaxLengthAddValidatorComponent } from './add/max-length-add.component';

@NgModule({
  declarations: [
	MaxLengthCompleteValidatorComponent,
	MaxLengthValueValidatorComponent,
	MaxLengthConditionalExpressionValidatorComponent,
	MaxLengthMessageValidatorComponent,
	MaxLengthDynamicValidatorComponent,
	MaxLengthAddValidatorComponent,
  ],
entryComponents: [
	MaxLengthCompleteValidatorComponent,
	MaxLengthValueValidatorComponent,
	MaxLengthConditionalExpressionValidatorComponent,
	MaxLengthMessageValidatorComponent,
	MaxLengthDynamicValidatorComponent,
	MaxLengthAddValidatorComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	MaxLengthCompleteValidatorComponent,
	MaxLengthValueValidatorComponent,
	MaxLengthConditionalExpressionValidatorComponent,
	MaxLengthMessageValidatorComponent,
	MaxLengthDynamicValidatorComponent,
	MaxLengthAddValidatorComponent,
  ],

})
export class  MaxLengthExtendedModule { }
