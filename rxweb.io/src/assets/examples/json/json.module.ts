import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { JsonCompleteComponent } from './complete/json-complete.component';
import { JsonMessageComponent } from './message/json-message.component';
import { JsonConditionalExpressionComponent } from './conditionalExpression/json-conditional-expression.component';
import { JsonDynamicComponent } from './dynamic/json-dynamic.component';
import { JsonAddComponent } from './add/json-add.component';
import { JsonEditComponent } from './edit/json-edit.component';

@NgModule({
  declarations: [
	JsonCompleteComponent,
	JsonMessageComponent,
	JsonConditionalExpressionComponent,
	JsonDynamicComponent,
	JsonAddComponent,
	JsonEditComponent,
  ],
entryComponents: [
	JsonCompleteComponent,
	JsonMessageComponent,
	JsonConditionalExpressionComponent,
	JsonDynamicComponent,
	JsonAddComponent,
	JsonEditComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	JsonCompleteComponent,
	JsonMessageComponent,
	JsonConditionalExpressionComponent,
	JsonDynamicComponent,
	JsonAddComponent,
	JsonEditComponent,
  ],

})
export class  JsonExtendedModule { }
