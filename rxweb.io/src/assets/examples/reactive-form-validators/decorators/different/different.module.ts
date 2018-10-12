import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { DifferentCompleteComponent } from './complete/different-complete.component';
import { DifferentFieldNameComponent } from './fieldName/different-field-name.component';
import { DifferentMessageComponent } from './message/different-message.component';
import { DifferentConditionalExpressionComponent } from './conditionalExpression/different-conditional-expression.component';
import { DifferentDynamicComponent } from './dynamic/different-dynamic.component';
import { DifferentAddComponent } from './add/different-add.component';
import { DifferentEditComponent } from './edit/different-edit.component';

@NgModule({
  declarations: [
	DifferentCompleteComponent,
	DifferentFieldNameComponent,
	DifferentMessageComponent,
	DifferentConditionalExpressionComponent,
	DifferentDynamicComponent,
	DifferentAddComponent,
	DifferentEditComponent,
  ],
entryComponents: [
	DifferentCompleteComponent,
	DifferentFieldNameComponent,
	DifferentMessageComponent,
	DifferentConditionalExpressionComponent,
	DifferentDynamicComponent,
	DifferentAddComponent,
	DifferentEditComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	DifferentCompleteComponent,
	DifferentFieldNameComponent,
	DifferentMessageComponent,
	DifferentConditionalExpressionComponent,
	DifferentDynamicComponent,
	DifferentAddComponent,
	DifferentEditComponent,
  ],

})
export class  DifferentExtendedModule { }
