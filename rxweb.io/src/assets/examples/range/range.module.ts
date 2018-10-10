import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { RangeCompleteComponent } from './complete/range-complete.component';
import { RangeMinimumNumberComponent } from './minimumNumber/range-minimum-number.component';
import { RangeMaximumNumberComponent } from './maximumNumber/range-maximum-number.component';
import { RangeConditionalExpressionComponent } from './conditionalExpression/range-conditional-expression.component';
import { RangeMessageComponent } from './message/range-message.component';
import { RangeAddComponent } from './add/range-add.component';
import { RangeEditComponent } from './edit/range-edit.component';

@NgModule({
  declarations: [
	RangeCompleteComponent,
	RangeMinimumNumberComponent,
	RangeMaximumNumberComponent,
	RangeConditionalExpressionComponent,
	RangeMessageComponent,
	RangeAddComponent,
	RangeEditComponent,
  ],
entryComponents: [
	RangeCompleteComponent,
	RangeMinimumNumberComponent,
	RangeMaximumNumberComponent,
	RangeConditionalExpressionComponent,
	RangeMessageComponent,
	RangeAddComponent,
	RangeEditComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	RangeCompleteComponent,
	RangeMinimumNumberComponent,
	RangeMaximumNumberComponent,
	RangeConditionalExpressionComponent,
	RangeMessageComponent,
	RangeAddComponent,
	RangeEditComponent,
  ],

})
export class  RangeExtendedModule { }
