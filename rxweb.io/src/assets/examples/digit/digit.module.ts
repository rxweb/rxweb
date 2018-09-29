import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { DigitCompleteComponent } from './complete/digit-complete.component';
import { DigitConditionalExpressionsComponent } from './conditionalExpressions/digit-conditional-expressions.component';
import { DigitMessageComponent } from './message/digit-message.component';
import { DigitAddComponent } from './add/digit-add.component';
import { DigitEditComponent } from './edit/digit-edit.component';

@NgModule({
  declarations: [
	DigitCompleteComponent,
	DigitConditionalExpressionsComponent,
	DigitMessageComponent,
	DigitAddComponent,
	DigitEditComponent,
  ],
entryComponents: [
	DigitCompleteComponent,
	DigitConditionalExpressionsComponent,
	DigitMessageComponent,
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
	DigitConditionalExpressionsComponent,
	DigitMessageComponent,
	DigitAddComponent,
	DigitEditComponent,
  ],

})
export class  DigitExtendedModule { }
