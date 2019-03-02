import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { CusipCompleteComponent } from './complete/cusip-complete.component';
import { CusipConditionalExpressionComponent } from './conditionalExpression/cusip-conditional-expression.component';
import { CusipMessageComponent } from './message/cusip-message.component';
import { CusipDynamicComponent } from './dynamic/cusip-dynamic.component';
import { CusipAddComponent } from './add/cusip-add.component';
import { CusipEditComponent } from './edit/cusip-edit.component';

@NgModule({
  declarations: [
	CusipCompleteComponent,
	CusipConditionalExpressionComponent,
	CusipMessageComponent,
	CusipDynamicComponent,
	CusipAddComponent,
	CusipEditComponent,
  ],
entryComponents: [
	CusipCompleteComponent,
	CusipConditionalExpressionComponent,
	CusipMessageComponent,
	CusipDynamicComponent,
	CusipAddComponent,
	CusipEditComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	CusipCompleteComponent,
	CusipConditionalExpressionComponent,
	CusipMessageComponent,
	CusipDynamicComponent,
	CusipAddComponent,
	CusipEditComponent,
  ],

})
export class  CusipDecoratorsExtendedModule { }
