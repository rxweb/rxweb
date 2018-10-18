import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { PortCompleteValidatorComponent } from './complete/port-complete.component';
import { PortConditionalExpressionValidatorComponent } from './conditionalExpression/port-conditional-expression.component';
import { PortMessageValidatorComponent } from './message/port-message.component';
import { PortDynamicValidatorComponent } from './dynamic/port-dynamic.component';
import { PortAddValidatorComponent } from './add/port-add.component';

@NgModule({
  declarations: [
	PortCompleteValidatorComponent,
	PortConditionalExpressionValidatorComponent,
	PortMessageValidatorComponent,
	PortDynamicValidatorComponent,
	PortAddValidatorComponent,
  ],
entryComponents: [
	PortCompleteValidatorComponent,
	PortConditionalExpressionValidatorComponent,
	PortMessageValidatorComponent,
	PortDynamicValidatorComponent,
	PortAddValidatorComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	PortCompleteValidatorComponent,
	PortConditionalExpressionValidatorComponent,
	PortMessageValidatorComponent,
	PortDynamicValidatorComponent,
	PortAddValidatorComponent,
  ],

})
export class  PortExtendedModule { }
