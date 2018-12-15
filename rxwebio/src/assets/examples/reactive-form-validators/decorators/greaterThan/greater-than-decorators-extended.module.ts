import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { GreaterThanCompleteComponent } from './complete/greater-than-complete.component';
import { GreaterThanFieldNameComponent } from './fieldName/greater-than-field-name.component';
import { GreaterThanConditionalExpressionComponent } from './conditionalExpression/greater-than-conditional-expression.component';
import { GreaterThanMessageComponent } from './message/greater-than-message.component';
import { GreaterThanDynamicComponent } from './dynamic/greater-than-dynamic.component';
import { GreaterThanAddComponent } from './add/greater-than-add.component';
import { GreaterThanEditComponent } from './edit/greater-than-edit.component';

@NgModule({
  declarations: [
	GreaterThanCompleteComponent,
	GreaterThanFieldNameComponent,
	GreaterThanConditionalExpressionComponent,
	GreaterThanMessageComponent,
	GreaterThanDynamicComponent,
	GreaterThanAddComponent,
	GreaterThanEditComponent,
  ],
entryComponents: [
	GreaterThanCompleteComponent,
	GreaterThanFieldNameComponent,
	GreaterThanConditionalExpressionComponent,
	GreaterThanMessageComponent,
	GreaterThanDynamicComponent,
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
	GreaterThanConditionalExpressionComponent,
	GreaterThanMessageComponent,
	GreaterThanDynamicComponent,
	GreaterThanAddComponent,
	GreaterThanEditComponent,
  ],

})
export class  GreaterThanDecoratorsExtendedModule { }
