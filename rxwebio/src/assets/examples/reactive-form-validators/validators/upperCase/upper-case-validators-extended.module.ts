import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { UpperCaseCompleteValidatorComponent } from './complete/upper-case-complete.component';
import { UpperCaseConditionalExpressionValidatorComponent } from './conditionalExpression/upper-case-conditional-expression.component';
import { UpperCaseMessageValidatorComponent } from './message/upper-case-message.component';
import { UpperCaseDynamicValidatorComponent } from './dynamic/upper-case-dynamic.component';
import { UpperCaseAddValidatorComponent } from './add/upper-case-add.component';

@NgModule({
  declarations: [
	UpperCaseCompleteValidatorComponent,
	UpperCaseConditionalExpressionValidatorComponent,
	UpperCaseMessageValidatorComponent,
	UpperCaseDynamicValidatorComponent,
	UpperCaseAddValidatorComponent,
  ],
entryComponents: [
	UpperCaseCompleteValidatorComponent,
	UpperCaseConditionalExpressionValidatorComponent,
	UpperCaseMessageValidatorComponent,
	UpperCaseDynamicValidatorComponent,
	UpperCaseAddValidatorComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	UpperCaseCompleteValidatorComponent,
	UpperCaseConditionalExpressionValidatorComponent,
	UpperCaseMessageValidatorComponent,
	UpperCaseDynamicValidatorComponent,
	UpperCaseAddValidatorComponent,
  ],

})
export class  UpperCaseValidatorsExtendedModule { }
