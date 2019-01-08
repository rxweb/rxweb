import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { AllOfCompleteValidatorComponent } from './complete/all-of-complete.component';
import { AllOfConditionalExpressionValidatorComponent } from './conditionalExpression/all-of-conditonal-expression.component';
import { AllOfMatchValuesValidatorComponent } from './matchValues/all-of-match-values.component';
import { AllOfMessageValidatorComponent } from './message/all-of-message.component';
import { AllOfDynamicValidatorComponent } from './dynamic/all-of-dynamic.component';
import { AllOfAddValidatorComponent } from './add/all-of-add.component';


@NgModule({
  declarations: [
	AllOfCompleteValidatorComponent,
	AllOfConditionalExpressionValidatorComponent,
	AllOfMatchValuesValidatorComponent,
	AllOfMessageValidatorComponent,
	AllOfDynamicValidatorComponent,
	AllOfAddValidatorComponent,
  ],
entryComponents: [
	AllOfCompleteValidatorComponent,
	AllOfConditionalExpressionValidatorComponent,
	AllOfMatchValuesValidatorComponent,
	AllOfMessageValidatorComponent,
	AllOfDynamicValidatorComponent,
	AllOfAddValidatorComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	AllOfCompleteValidatorComponent,
	AllOfConditionalExpressionValidatorComponent,
	AllOfMatchValuesValidatorComponent,
	AllOfMessageValidatorComponent,
	AllOfDynamicValidatorComponent,
	AllOfAddValidatorComponent,
  ],

})
export class  AllOfValidatorsExtendedModule { }
