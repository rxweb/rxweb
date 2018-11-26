import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { PortCompleteTemplateDrivenComponent } from './complete/port-complete.component';
import { PortConditionalExpressionTemplateDrivenComponent } from './conditionalExpression/port-conditional-expression.component';
import { PortMessageTemplateDrivenComponent } from './message/port-message.component';
import { PortAddTemplateDrivenComponent } from './add/port-add.component';

@NgModule({
  declarations: [
	PortCompleteTemplateDrivenComponent,
	PortConditionalExpressionTemplateDrivenComponent,
	PortMessageTemplateDrivenComponent,
	PortAddTemplateDrivenComponent,
  ],
entryComponents: [
	PortCompleteTemplateDrivenComponent,
	PortConditionalExpressionTemplateDrivenComponent,
	PortMessageTemplateDrivenComponent,
	PortAddTemplateDrivenComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	PortCompleteTemplateDrivenComponent,
	PortConditionalExpressionTemplateDrivenComponent,
	PortMessageTemplateDrivenComponent,
	PortAddTemplateDrivenComponent,
  ],

})
export class  PortTemplateDrivenExtendedModule { }
