import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { NumericCompleteValidatorComponent } from './complete/numeric-complete.component';
import { NumericAcceptValueValidatorComponent } from './acceptValue/numeric-accept-value.component';
import { NumericAllowDecimalValidatorComponent } from './allowDecimal/numeric-allow-decimal.component';
import { NumericMessageValidatorComponent } from './message/numeric-message.component';
import { NumericConditionalExpressionValidatorComponent } from './conditionalExpression/numeric-conditional-expression.component';
import { NumericDynamicValidatorComponent } from './dynamic/numeric-dynamic.component';
import { NumericAddValidatorComponent } from './add/numeric-add.component';

@NgModule({
  declarations: [
	NumericCompleteValidatorComponent,
	NumericAcceptValueValidatorComponent,
	NumericAllowDecimalValidatorComponent,
	NumericMessageValidatorComponent,
	NumericConditionalExpressionValidatorComponent,
	NumericDynamicValidatorComponent,
	NumericAddValidatorComponent,
  ],
entryComponents: [
	NumericCompleteValidatorComponent,
	NumericAcceptValueValidatorComponent,
	NumericAllowDecimalValidatorComponent,
	NumericMessageValidatorComponent,
	NumericConditionalExpressionValidatorComponent,
	NumericDynamicValidatorComponent,
	NumericAddValidatorComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	NumericCompleteValidatorComponent,
	NumericAcceptValueValidatorComponent,
	NumericAllowDecimalValidatorComponent,
	NumericMessageValidatorComponent,
	NumericConditionalExpressionValidatorComponent,
	NumericDynamicValidatorComponent,
	NumericAddValidatorComponent,
  ],

})
export class  NumericValidatorsExtendedModule { }
