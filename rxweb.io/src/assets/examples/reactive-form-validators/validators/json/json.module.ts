import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { JsonCompleteValidatorComponent } from './complete/json-complete.component';
import { JsonMessageValidatorComponent } from './message/json-message.component';
import { JsonConditionalExpressionValidatorComponent } from './conditionalExpression/json-conditional-expression.component';
import { JsonDynamicValidatorComponent } from './dynamic/json-dynamic.component';
import { JsonAddValidatorComponent } from './add/json-add.component';

@NgModule({
  declarations: [
	JsonCompleteValidatorComponent,
	JsonMessageValidatorComponent,
	JsonConditionalExpressionValidatorComponent,
	JsonDynamicValidatorComponent,
	JsonAddValidatorComponent,
  ],
entryComponents: [
	JsonCompleteValidatorComponent,
	JsonMessageValidatorComponent,
	JsonConditionalExpressionValidatorComponent,
	JsonDynamicValidatorComponent,
	JsonAddValidatorComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	JsonCompleteValidatorComponent,
	JsonMessageValidatorComponent,
	JsonConditionalExpressionValidatorComponent,
	JsonDynamicValidatorComponent,
	JsonAddValidatorComponent,
  ],

})
export class  JsonExtendedModule { }
