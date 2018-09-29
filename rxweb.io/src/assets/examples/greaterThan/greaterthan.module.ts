import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { GreaterThanCompleteComponent } from './complete/greater-than-complete.component';
import { GreaterThanFieldNameComponent } from './fieldName/greater-than-field-name.component';
import { GreaterThanConditionalExpressionsComponent } from './conditionalExpressions/greater-than-conditional-expressions.component';
import { GreaterThanMessageComponent } from './message/greater-than-message.component';
import { GreaterThanAddComponent } from './add/greater-than-add.component';
import { GreaterThanEditComponent } from './edit/greater-than-edit.component';

@NgModule({
  declarations: [
	GreaterThanCompleteComponent,
	GreaterThanFieldNameComponent,
	GreaterThanConditionalExpressionsComponent,
	GreaterThanMessageComponent,
	GreaterThanAddComponent,
	GreaterThanEditComponent,
  ],
entryComponents: [
	GreaterThanCompleteComponent,
	GreaterThanFieldNameComponent,
	GreaterThanConditionalExpressionsComponent,
	GreaterThanMessageComponent,
	GreaterThanAddComponent,
	GreaterThanEditComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	GreaterThanCompleteComponent,
	GreaterThanFieldNameComponent,
	GreaterThanConditionalExpressionsComponent,
	GreaterThanMessageComponent,
	GreaterThanAddComponent,
	GreaterThanEditComponent,
  ],

})
export class  GreaterThanExtendedModule { }
