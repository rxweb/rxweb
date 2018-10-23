import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { LessThanCompleteComponent } from './complete/less-than-complete.component';
import { LessThanFieldNameComponent } from './fieldName/less-than-field-name.component';
import { LessThanConditionalExpressionComponent } from './conditionalExpression/less-than-conditional-expression.component';
import { LessThanMessageComponent } from './message/less-than-message.component';
import { LessThanDynamicComponent } from './dynamic/less-than-dynamic.component';
import { LessThanAddComponent } from './add/less-than-add.component';
import { LessThanEditComponent } from './edit/less-than-edit.component';

@NgModule({
  declarations: [
	LessThanCompleteComponent,
	LessThanFieldNameComponent,
	LessThanConditionalExpressionComponent,
	LessThanMessageComponent,
	LessThanDynamicComponent,
	LessThanAddComponent,
	LessThanEditComponent,
  ],
entryComponents: [
	LessThanCompleteComponent,
	LessThanFieldNameComponent,
	LessThanConditionalExpressionComponent,
	LessThanMessageComponent,
	LessThanDynamicComponent,
	LessThanAddComponent,
	LessThanEditComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	LessThanCompleteComponent,
	LessThanFieldNameComponent,
	LessThanConditionalExpressionComponent,
	LessThanMessageComponent,
	LessThanDynamicComponent,
	LessThanAddComponent,
	LessThanEditComponent,
  ],

})
export class  LessThanDecoratorsExtendedModule { }
