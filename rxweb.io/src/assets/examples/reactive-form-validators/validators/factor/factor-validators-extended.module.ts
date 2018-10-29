import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { FactorCompleteValidatorComponent } from './complete/factor-complete.component';
import { FactorFieldNameValidatorComponent } from './fieldName/factor-field-name.component';
import { FactorConditionalExpressionValidatorComponent } from './conditionalExpression/factor-conditional-expression.component';
import { FactorDividendValidatorComponent } from './dividend/factor-dividend.component';
import { FactorMessageValidatorComponent } from './message/factor-message.component';
import { FactorDynamicValidatorComponent } from './dynamic/factor-dynamic.component';
import { FactorAddValidatorComponent } from './add/factor-add.component';

@NgModule({
  declarations: [
	FactorCompleteValidatorComponent,
	FactorFieldNameValidatorComponent,
	FactorConditionalExpressionValidatorComponent,
	FactorDividendValidatorComponent,
	FactorMessageValidatorComponent,
	FactorDynamicValidatorComponent,
	FactorAddValidatorComponent,
  ],
entryComponents: [
	FactorCompleteValidatorComponent,
	FactorFieldNameValidatorComponent,
	FactorConditionalExpressionValidatorComponent,
	FactorDividendValidatorComponent,
	FactorMessageValidatorComponent,
	FactorDynamicValidatorComponent,
	FactorAddValidatorComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	FactorCompleteValidatorComponent,
	FactorFieldNameValidatorComponent,
	FactorConditionalExpressionValidatorComponent,
	FactorDividendValidatorComponent,
	FactorMessageValidatorComponent,
	FactorDynamicValidatorComponent,
	FactorAddValidatorComponent,
  ],

})
export class  FactorValidatorsExtendedModule { }
