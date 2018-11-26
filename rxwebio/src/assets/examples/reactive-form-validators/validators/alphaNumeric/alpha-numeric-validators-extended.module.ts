import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { AlphaNumericCompleteValidatorComponent } from './complete/alpha-numeric-complete.component';
import { AlphaNumericAllowWhiteSpaceValidatorComponent } from './allowWhiteSpace/alpha-numeric-allow-white-space.component';
import { AlphaNumericMessageValidatorComponent } from './message/alpha-numeric-message.component';
import { AlphaNumericConditionalExpressionValidatorComponent } from './conditionalExpression/alpha-numeric-conditional-expression.component';
import { AlphaNumericDynamicValidatorComponent } from './dynamic/alpha-numeric-dynamic.component';
import { AlphaNumericAddValidatorComponent } from './add/alpha-numeric-add.component';

@NgModule({
  declarations: [
	AlphaNumericCompleteValidatorComponent,
	AlphaNumericAllowWhiteSpaceValidatorComponent,
	AlphaNumericMessageValidatorComponent,
	AlphaNumericConditionalExpressionValidatorComponent,
	AlphaNumericDynamicValidatorComponent,
	AlphaNumericAddValidatorComponent,
  ],
entryComponents: [
	AlphaNumericCompleteValidatorComponent,
	AlphaNumericAllowWhiteSpaceValidatorComponent,
	AlphaNumericMessageValidatorComponent,
	AlphaNumericConditionalExpressionValidatorComponent,
	AlphaNumericDynamicValidatorComponent,
	AlphaNumericAddValidatorComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	AlphaNumericCompleteValidatorComponent,
	AlphaNumericAllowWhiteSpaceValidatorComponent,
	AlphaNumericMessageValidatorComponent,
	AlphaNumericConditionalExpressionValidatorComponent,
	AlphaNumericDynamicValidatorComponent,
	AlphaNumericAddValidatorComponent,
  ],

})
export class  AlphaNumericValidatorsExtendedModule { }
