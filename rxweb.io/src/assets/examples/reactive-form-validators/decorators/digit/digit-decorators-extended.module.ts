import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { DigitCompleteComponent } from './complete/digit-complete.component';
import { DigitConditionalExpressionComponent } from './conditionalExpression/digit-conditional-expression.component';
import { DigitMessageComponent } from './message/digit-message.component';
import { DigitDynamicComponent } from './dynamic/digit-dynamic.component';
import { DigitAddComponent } from './add/digit-add.component';
import { DigitEditComponent } from './edit/digit-edit.component';

@NgModule({
  declarations: [
	DigitCompleteComponent,
	DigitConditionalExpressionComponent,
	DigitMessageComponent,
	DigitDynamicComponent,
	DigitAddComponent,
	DigitEditComponent,
  ],
entryComponents: [
	DigitCompleteComponent,
	DigitConditionalExpressionComponent,
	DigitMessageComponent,
	DigitDynamicComponent,
	DigitAddComponent,
	DigitEditComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	DigitCompleteComponent,
	DigitConditionalExpressionComponent,
	DigitMessageComponent,
	DigitDynamicComponent,
	DigitAddComponent,
	DigitEditComponent,
  ],

})
export class  DigitDecoratorsExtendedModule { }
