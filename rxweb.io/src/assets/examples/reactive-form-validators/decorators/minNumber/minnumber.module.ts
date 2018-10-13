import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { MinNumberCompleteComponent } from './complete/min-number-complete.component';
import { MinNumberValueComponent } from './value/min-number-value.component';
import { MinNumberMessageComponent } from './message/min-number-message.component';
import { MinNumberConditionalExpressionComponent } from './conditionalExpression/min-number-conditional-expression.component';
import { MinNumberDynamicComponent } from './dynamic/min-number-dynamic.component';
import { MinNumberAddComponent } from './add/min-number-add.component';
import { MinNumberEditComponent } from './edit/min-number-edit.component';

@NgModule({
  declarations: [
	MinNumberCompleteComponent,
	MinNumberValueComponent,
	MinNumberMessageComponent,
	MinNumberConditionalExpressionComponent,
	MinNumberDynamicComponent,
	MinNumberAddComponent,
	MinNumberEditComponent,
  ],
entryComponents: [
	MinNumberCompleteComponent,
	MinNumberValueComponent,
	MinNumberMessageComponent,
	MinNumberConditionalExpressionComponent,
	MinNumberDynamicComponent,
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
	MinNumberConditionalExpressionComponent,
	MinNumberDynamicComponent,
	MinNumberAddComponent,
	MinNumberEditComponent,
  ],

})
export class  MinNumberExtendedModule { }
