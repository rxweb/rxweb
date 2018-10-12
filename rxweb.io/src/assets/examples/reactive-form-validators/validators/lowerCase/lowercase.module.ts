import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { LowerCaseCompleteValidatorComponent } from './complete/lower-case-complete.component';
import { LowerCaseConditionalExpressionValidatorComponent } from './conditionalExpression/lower-case-conditional-expression.component';
import { LowerCaseMessageValidatorComponent } from './message/lower-case-message.component';
import { LowerCaseDynamicValidatorComponent } from './dynamic/lower-case-dynamic.component';
import { LowerCaseAddValidatorComponent } from './add/lower-case-add.component';

@NgModule({
  declarations: [
	LowerCaseCompleteValidatorComponent,
	LowerCaseConditionalExpressionValidatorComponent,
	LowerCaseMessageValidatorComponent,
	LowerCaseDynamicValidatorComponent,
	LowerCaseAddValidatorComponent,
  ],
entryComponents: [
	LowerCaseCompleteValidatorComponent,
	LowerCaseConditionalExpressionValidatorComponent,
	LowerCaseMessageValidatorComponent,
	LowerCaseDynamicValidatorComponent,
	LowerCaseAddValidatorComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	LowerCaseCompleteValidatorComponent,
	LowerCaseConditionalExpressionValidatorComponent,
	LowerCaseMessageValidatorComponent,
	LowerCaseDynamicValidatorComponent,
	LowerCaseAddValidatorComponent,
  ],

})
export class  LowerCaseExtendedModule { }
