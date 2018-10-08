import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { MinLengthCompleteComponent } from './complete/min-length-complete.component';
import { MinLengthValueComponent } from './value/min-length-value.component';
import { MinLengthMessageComponent } from './message/min-length-message.component';
import { MinLengthConditionalExpressionComponent } from './conditionalExpression/min-length-conditional-expression.component';
import { MinLengthAddComponent } from './add/min-length-add.component';
import { MinLengthEditComponent } from './edit/min-length-edit.component';

@NgModule({
  declarations: [
	MinLengthCompleteComponent,
	MinLengthValueComponent,
	MinLengthMessageComponent,
	MinLengthConditionalExpressionComponent,
	MinLengthAddComponent,
	MinLengthEditComponent,
  ],
entryComponents: [
	MinLengthCompleteComponent,
	MinLengthValueComponent,
	MinLengthMessageComponent,
	MinLengthConditionalExpressionComponent,
	MinLengthAddComponent,
	MinLengthEditComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	MinLengthCompleteComponent,
	MinLengthValueComponent,
	MinLengthMessageComponent,
	MinLengthConditionalExpressionComponent,
	MinLengthAddComponent,
	MinLengthEditComponent,
  ],

})
export class  MinLengthExtendedModule { }
