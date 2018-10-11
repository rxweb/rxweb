import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { EvenCompleteComponent } from './complete/even-complete.component';
import { EvenConditionalExpressionComponent } from './conditionalExpression/even-conditional-expression.component';
import { EvenMessageComponent } from './message/even-message.component';
import { EvenDynamicComponent } from './dynamic/even-dynamic.component';
import { EvenAddComponent } from './add/even-add.component';
import { EvenEditComponent } from './edit/even-edit.component';

@NgModule({
  declarations: [
	EvenCompleteComponent,
	EvenConditionalExpressionComponent,
	EvenMessageComponent,
	EvenDynamicComponent,
	EvenAddComponent,
	EvenEditComponent,
  ],
entryComponents: [
	EvenCompleteComponent,
	EvenConditionalExpressionComponent,
	EvenMessageComponent,
	EvenDynamicComponent,
	EvenAddComponent,
	EvenEditComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	EvenCompleteComponent,
	EvenConditionalExpressionComponent,
	EvenMessageComponent,
	EvenDynamicComponent,
	EvenAddComponent,
	EvenEditComponent,
  ],

})
export class  EvenExtendedModule { }
