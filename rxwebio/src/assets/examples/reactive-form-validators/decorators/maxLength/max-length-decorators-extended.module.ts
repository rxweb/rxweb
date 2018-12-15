import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { MaxLengthCompleteComponent } from './complete/max-length-complete.component';
import { MaxLengthValueComponent } from './value/max-length-value.component';
import { MaxLengthConditionalExpressionComponent } from './conditionalExpression/max-length-conditional-expression.component';
import { MaxLengthMessageComponent } from './message/max-length-message.component';
import { MaxLengthDynamicComponent } from './dynamic/max-length-dynamic.component';
import { MaxLengthAddComponent } from './add/max-length-add.component';
import { MaxLengthEditComponent } from './edit/max-length-edit.component';

@NgModule({
  declarations: [
	MaxLengthCompleteComponent,
	MaxLengthValueComponent,
	MaxLengthConditionalExpressionComponent,
	MaxLengthMessageComponent,
	MaxLengthDynamicComponent,
	MaxLengthAddComponent,
	MaxLengthEditComponent,
  ],
entryComponents: [
	MaxLengthCompleteComponent,
	MaxLengthValueComponent,
	MaxLengthConditionalExpressionComponent,
	MaxLengthMessageComponent,
	MaxLengthDynamicComponent,
	MaxLengthAddComponent,
	MaxLengthEditComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	MaxLengthCompleteComponent,
	MaxLengthValueComponent,
	MaxLengthConditionalExpressionComponent,
	MaxLengthMessageComponent,
	MaxLengthDynamicComponent,
	MaxLengthAddComponent,
	MaxLengthEditComponent,
  ],

})
export class  MaxLengthDecoratorsExtendedModule { }
