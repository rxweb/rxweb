import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { PortCompleteComponent } from './complete/port-complete.component';
import { PortConditionalExpressionComponent } from './conditionalExpression/port-conditional-expression.component';
import { PortMessageComponent } from './message/port-message.component';
import { PortDynamicComponent } from './dynamic/port-dynamic.component';
import { PortAddComponent } from './add/port-add.component';
import { PortEditComponent } from './edit/port-edit.component';

@NgModule({
  declarations: [
	PortCompleteComponent,
	PortConditionalExpressionComponent,
	PortMessageComponent,
	PortDynamicComponent,
	PortAddComponent,
	PortEditComponent,
  ],
entryComponents: [
	PortCompleteComponent,
	PortConditionalExpressionComponent,
	PortMessageComponent,
	PortDynamicComponent,
	PortAddComponent,
	PortEditComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	PortCompleteComponent,
	PortConditionalExpressionComponent,
	PortMessageComponent,
	PortDynamicComponent,
	PortAddComponent,
	PortEditComponent,
  ],

})
export class  PortExtendedModule { }
