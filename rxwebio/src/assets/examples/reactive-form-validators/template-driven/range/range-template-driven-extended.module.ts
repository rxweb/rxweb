import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { RangeCompleteTemplateDrivenComponent } from './complete/range-complete.component';
import { RangeMinimumNumberTemplateDrivenComponent } from './minimumNumber/range-minimum-number.component';
import { RangeMaximumNumberTemplateDrivenComponent } from './maximumNumber/range-maximum-number.component';
import { RangeConditionalExpressionTemplateDrivenComponent } from './conditionalExpression/range-conditional-expression.component';
import { RangeMessageTemplateDrivenComponent } from './message/range-message.component';
import { RangeAddTemplateDrivenComponent } from './add/range-add.component';

@NgModule({
  declarations: [
	RangeCompleteTemplateDrivenComponent,
	RangeMinimumNumberTemplateDrivenComponent,
	RangeMaximumNumberTemplateDrivenComponent,
	RangeConditionalExpressionTemplateDrivenComponent,
	RangeMessageTemplateDrivenComponent,
	RangeAddTemplateDrivenComponent,
  ],
entryComponents: [
	RangeCompleteTemplateDrivenComponent,
	RangeMinimumNumberTemplateDrivenComponent,
	RangeMaximumNumberTemplateDrivenComponent,
	RangeConditionalExpressionTemplateDrivenComponent,
	RangeMessageTemplateDrivenComponent,
	RangeAddTemplateDrivenComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	RangeCompleteTemplateDrivenComponent,
	RangeMinimumNumberTemplateDrivenComponent,
	RangeMaximumNumberTemplateDrivenComponent,
	RangeConditionalExpressionTemplateDrivenComponent,
	RangeMessageTemplateDrivenComponent,
	RangeAddTemplateDrivenComponent,
  ],

})
export class  RangeTemplateDrivenExtendedModule { }
