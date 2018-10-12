import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { AlphaCompleteValidatorComponent } from './complete/alpha-complete.component';
import { AlphaConditionalExpressionValidatorComponent } from './conditionalExpression/alpha-conditional-expression.component';
import { AlphaAllowWhiteSpaceValidatorComponent } from './allowWhiteSpace/alpha-allow-white-space.component';
import { AlphaMessageValidatorComponent } from './message/alpha-message.component';
import { AlphaDynamicValidatorComponent } from './dynamic/alpha-dynamic.component';
import { AlphaAddValidatorComponent } from './add/alpha-add.component';

@NgModule({
  declarations: [
	AlphaCompleteValidatorComponent,
	AlphaConditionalExpressionValidatorComponent,
	AlphaAllowWhiteSpaceValidatorComponent,
	AlphaMessageValidatorComponent,
	AlphaDynamicValidatorComponent,
	AlphaAddValidatorComponent,
  ],
entryComponents: [
	AlphaCompleteValidatorComponent,
	AlphaConditionalExpressionValidatorComponent,
	AlphaAllowWhiteSpaceValidatorComponent,
	AlphaMessageValidatorComponent,
	AlphaDynamicValidatorComponent,
	AlphaAddValidatorComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	AlphaCompleteValidatorComponent,
	AlphaConditionalExpressionValidatorComponent,
	AlphaAllowWhiteSpaceValidatorComponent,
	AlphaMessageValidatorComponent,
	AlphaDynamicValidatorComponent,
	AlphaAddValidatorComponent,
  ],

})
export class  AlphaExtendedModule { }
