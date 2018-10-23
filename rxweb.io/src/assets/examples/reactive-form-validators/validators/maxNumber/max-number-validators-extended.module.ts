import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { MaxNumberCompleteValidatorComponent } from './complete/max-number-complete.component';
import { MaxNumberValueValidatorComponent } from './value/max-number-value.component';
import { MaxNumberConditionalExpressionValidatorComponent } from './conditionalExpression/max-number-conditional-expression.component';
import { MaxNumberMessageValidatorComponent } from './message/max-number-message.component';
import { MaxNumberDynamicValidatorComponent } from './dynamic/max-number-dynamic.component';
import { MaxNumberAddValidatorComponent } from './add/max-number-add.component';

@NgModule({
  declarations: [
	MaxNumberCompleteValidatorComponent,
	MaxNumberValueValidatorComponent,
	MaxNumberConditionalExpressionValidatorComponent,
	MaxNumberMessageValidatorComponent,
	MaxNumberDynamicValidatorComponent,
	MaxNumberAddValidatorComponent,
  ],
entryComponents: [
	MaxNumberCompleteValidatorComponent,
	MaxNumberValueValidatorComponent,
	MaxNumberConditionalExpressionValidatorComponent,
	MaxNumberMessageValidatorComponent,
	MaxNumberDynamicValidatorComponent,
	MaxNumberAddValidatorComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	MaxNumberCompleteValidatorComponent,
	MaxNumberValueValidatorComponent,
	MaxNumberConditionalExpressionValidatorComponent,
	MaxNumberMessageValidatorComponent,
	MaxNumberDynamicValidatorComponent,
	MaxNumberAddValidatorComponent,
  ],

})
export class  MaxNumberValidatorsExtendedModule { }
