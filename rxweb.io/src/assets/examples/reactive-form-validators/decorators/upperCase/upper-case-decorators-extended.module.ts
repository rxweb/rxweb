import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { UpperCaseCompleteComponent } from './complete/upper-case-complete.component';
import { UpperCaseConditionalExpressionComponent } from './conditionalExpression/upper-case-conditional-expression.component';
import { UpperCaseMessageComponent } from './message/upper-case-message.component';
import { UpperCaseDynamicComponent } from './dynamic/upper-case-dynamic.component';
import { UpperCaseAddComponent } from './add/upper-case-add.component';
import { UpperCaseEditComponent } from './edit/upper-case-edit.component';

@NgModule({
  declarations: [
	UpperCaseCompleteComponent,
	UpperCaseConditionalExpressionComponent,
	UpperCaseMessageComponent,
	UpperCaseDynamicComponent,
	UpperCaseAddComponent,
	UpperCaseEditComponent,
  ],
entryComponents: [
	UpperCaseCompleteComponent,
	UpperCaseConditionalExpressionComponent,
	UpperCaseMessageComponent,
	UpperCaseDynamicComponent,
	UpperCaseAddComponent,
	UpperCaseEditComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	UpperCaseCompleteComponent,
	UpperCaseConditionalExpressionComponent,
	UpperCaseMessageComponent,
	UpperCaseDynamicComponent,
	UpperCaseAddComponent,
	UpperCaseEditComponent,
  ],

})
export class  UpperCaseDecoratorsExtendedModule { }
