import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { MinNumberCompleteValidatorComponent } from './complete/min-number-complete.component';
import { MinNumberValueValidatorComponent } from './value/min-number-value.component';
import { MinNumberMessageValidatorComponent } from './message/min-number-message.component';
import { MinNumberConditionalExpressionValidatorComponent } from './conditionalExpression/min-number-conditional-expression.component';
import { MinNumberDynamicValidatorComponent } from './dynamic/min-number-dynamic.component';
import { MinNumberAddValidatorComponent } from './add/min-number-add.component';

@NgModule({
  declarations: [
	MinNumberCompleteValidatorComponent,
	MinNumberValueValidatorComponent,
	MinNumberMessageValidatorComponent,
	MinNumberConditionalExpressionValidatorComponent,
	MinNumberDynamicValidatorComponent,
	MinNumberAddValidatorComponent,
  ],
entryComponents: [
	MinNumberCompleteValidatorComponent,
	MinNumberValueValidatorComponent,
	MinNumberMessageValidatorComponent,
	MinNumberConditionalExpressionValidatorComponent,
	MinNumberDynamicValidatorComponent,
	MinNumberAddValidatorComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	MinNumberCompleteValidatorComponent,
	MinNumberValueValidatorComponent,
	MinNumberMessageValidatorComponent,
	MinNumberConditionalExpressionValidatorComponent,
	MinNumberDynamicValidatorComponent,
	MinNumberAddValidatorComponent,
  ],

})
export class  MinNumberValidatorsExtendedModule { }
