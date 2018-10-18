import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { EndsWithCompleteComponent } from './complete/ends-with-complete.component';
import { EndsWithValueComponent } from './value/ends-with-value.component';
import { EndsWithMessageComponent } from './message/ends-with-message.component';
import { EndsWithConditionalExpressionComponent } from './conditionalExpression/ends-with-conditional-expression.component';
import { EndsWithDynamicComponent } from './dynamic/ends-with-dynamic.component';
import { EndsWithAddComponent } from './add/ends-with-add.component';
import { EndsWithEditComponent } from './edit/ends-with-edit.component';

@NgModule({
  declarations: [
	EndsWithCompleteComponent,
	EndsWithValueComponent,
	EndsWithMessageComponent,
	EndsWithConditionalExpressionComponent,
	EndsWithDynamicComponent,
	EndsWithAddComponent,
	EndsWithEditComponent,
  ],
entryComponents: [
	EndsWithCompleteComponent,
	EndsWithValueComponent,
	EndsWithMessageComponent,
	EndsWithConditionalExpressionComponent,
	EndsWithDynamicComponent,
	EndsWithAddComponent,
	EndsWithEditComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	EndsWithCompleteComponent,
	EndsWithValueComponent,
	EndsWithMessageComponent,
	EndsWithConditionalExpressionComponent,
	EndsWithDynamicComponent,
	EndsWithAddComponent,
	EndsWithEditComponent,
  ],

})
export class  EndsWithExtendedModule { }
