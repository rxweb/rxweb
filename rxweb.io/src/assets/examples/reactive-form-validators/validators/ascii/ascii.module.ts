import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { AsciiCompleteValidatorComponent } from './complete/ascii-complete.component';
import { AsciiConditionalExpressionValidatorComponent } from './conditionalExpression/ascii-conditional-expression.component';
import { AsciiMessageValidatorComponent } from './message/ascii-message.component';
import { AsciiDynamicValidatorComponent } from './dynamic/ascii-dynamic.component';
import { AsciiAddValidatorComponent } from './add/ascii-add.component';

@NgModule({
  declarations: [
	AsciiCompleteValidatorComponent,
	AsciiConditionalExpressionValidatorComponent,
	AsciiMessageValidatorComponent,
	AsciiDynamicValidatorComponent,
	AsciiAddValidatorComponent,
  ],
entryComponents: [
	AsciiCompleteValidatorComponent,
	AsciiConditionalExpressionValidatorComponent,
	AsciiMessageValidatorComponent,
	AsciiDynamicValidatorComponent,
	AsciiAddValidatorComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	AsciiCompleteValidatorComponent,
	AsciiConditionalExpressionValidatorComponent,
	AsciiMessageValidatorComponent,
	AsciiDynamicValidatorComponent,
	AsciiAddValidatorComponent,
  ],

})
export class  AsciiExtendedModule { }
