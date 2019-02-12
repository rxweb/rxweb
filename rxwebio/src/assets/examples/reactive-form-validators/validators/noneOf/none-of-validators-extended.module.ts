import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { NoneOfCompleteValidatorComponent } from './complete/none-of-complete.component';
import { NoneOfAddValidatorComponent } from './add/none-of-add.component';
import { NoneOfMatchValuesValidatorComponent } from './matchValues/none-of-match-values.component';
import { NoneOfMessageValidatorComponent } from './message/none-of-message.component';
import { NoneOfDynamicValidatorComponent } from './dynamic/none-of-dynamic.component';
import { NoneOfConditionalExpressionValidatorComponent } from './conditionalExpression/none-of-conditional-expression.component';
import { NoneOfNonArrayValueValidatorComponent } from './nonArrayValue/none-of-non-array-value.component';



@NgModule({
  declarations: [
	NoneOfCompleteValidatorComponent,
	NoneOfConditionalExpressionValidatorComponent,
	NoneOfMatchValuesValidatorComponent,
	NoneOfMessageValidatorComponent,
	NoneOfDynamicValidatorComponent,
	NoneOfAddValidatorComponent,
	NoneOfNonArrayValueValidatorComponent
  ],
entryComponents: [
	NoneOfCompleteValidatorComponent,
	NoneOfConditionalExpressionValidatorComponent,
	NoneOfMatchValuesValidatorComponent,
	NoneOfMessageValidatorComponent,
	NoneOfDynamicValidatorComponent,
	NoneOfAddValidatorComponent,
	NoneOfNonArrayValueValidatorComponent
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	NoneOfCompleteValidatorComponent,
	NoneOfConditionalExpressionValidatorComponent,
	NoneOfMatchValuesValidatorComponent,
	NoneOfMessageValidatorComponent,
	NoneOfDynamicValidatorComponent,
	NoneOfAddValidatorComponent,
	NoneOfNonArrayValueValidatorComponent
  ],

})
export class  NoneOfValidatorsExtendedModule { }
