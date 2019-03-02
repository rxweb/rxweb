import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { CusipCompleteValidatorComponent } from './complete/cusip-complete.component';
import { CusipConditionalExpressionValidatorComponent } from './conditionalExpression/cusip-conditional-expression.component';
import { CusipMessageValidatorComponent } from './message/cusip-message.component';
import { CusipDynamicValidatorComponent } from './dynamic/cusip-dynamic.component';
import { CusipAddValidatorComponent } from './add/cusip-add.component';

@NgModule({
  declarations: [
	CusipCompleteValidatorComponent,
	CusipConditionalExpressionValidatorComponent,
	CusipMessageValidatorComponent,
	CusipDynamicValidatorComponent,
	CusipAddValidatorComponent,
  ],
entryComponents: [
	CusipCompleteValidatorComponent,
	CusipConditionalExpressionValidatorComponent,
	CusipMessageValidatorComponent,
	CusipDynamicValidatorComponent,
	CusipAddValidatorComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	CusipCompleteValidatorComponent,
	CusipConditionalExpressionValidatorComponent,
	CusipMessageValidatorComponent,
	CusipDynamicValidatorComponent,
	CusipAddValidatorComponent,
  ],

})
export class  CusipValidatorsExtendedModule { }
