import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { OddCompleteValidatorComponent } from './complete/odd-complete.component';
import { OddConditionalExpressionValidatorComponent } from './conditionalExpression/odd-conditional-expression.component';
import { OddMessageValidatorComponent } from './message/odd-message.component';
import { OddDynamicValidatorComponent } from './dynamic/odd-dynamic.component';
import { OddAddValidatorComponent } from './add/odd-add.component';

@NgModule({
  declarations: [
	OddCompleteValidatorComponent,
	OddConditionalExpressionValidatorComponent,
	OddMessageValidatorComponent,
	OddDynamicValidatorComponent,
	OddAddValidatorComponent,
  ],
entryComponents: [
	OddCompleteValidatorComponent,
	OddConditionalExpressionValidatorComponent,
	OddMessageValidatorComponent,
	OddDynamicValidatorComponent,
	OddAddValidatorComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	OddCompleteValidatorComponent,
	OddConditionalExpressionValidatorComponent,
	OddMessageValidatorComponent,
	OddDynamicValidatorComponent,
	OddAddValidatorComponent,
  ],

})
export class  OddExtendedModule { }
