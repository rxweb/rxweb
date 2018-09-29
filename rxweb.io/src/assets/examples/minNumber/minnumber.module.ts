import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { MinNumberCompleteComponent } from './complete/min-number-complete.component';
import { MinNumberValueComponent } from './value/min-number-value.component';
import { MinNumberMessageComponent } from './message/min-number-message.component';
import { MinNumberConditionalExpressionsComponent } from './conditionalExpressions/min-number-conditional-expressions.component';
import { MinNumberAddComponent } from './add/min-number-add.component';
import { MinNumberEditComponent } from './edit/min-number-edit.component';

@NgModule({
  declarations: [
	MinNumberCompleteComponent,
	MinNumberValueComponent,
	MinNumberMessageComponent,
	MinNumberConditionalExpressionsComponent,
	MinNumberAddComponent,
	MinNumberEditComponent,
  ],
entryComponents: [
	MinNumberCompleteComponent,
	MinNumberValueComponent,
	MinNumberMessageComponent,
	MinNumberConditionalExpressionsComponent,
	MinNumberAddComponent,
	MinNumberEditComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	MinNumberCompleteComponent,
	MinNumberValueComponent,
	MinNumberMessageComponent,
	MinNumberConditionalExpressionsComponent,
	MinNumberAddComponent,
	MinNumberEditComponent,
  ],

})
export class  MinNumberExtendedModule { }
