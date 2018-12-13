import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { PortCompleteTemplateDrivenValidationDirectivesComponent } from './complete/port-complete.component';
import { PortConditionalExpressionTemplateDrivenValidationDirectivesComponent } from './conditionalExpression/port-conditional-expression.component';
import { PortMessageTemplateDrivenValidationDirectivesComponent } from './message/port-message.component';
import { PortAddTemplateDrivenValidationDirectivesComponent } from './add/port-add.component';

@NgModule({
  declarations: [
	PortCompleteTemplateDrivenValidationDirectivesComponent,
	PortConditionalExpressionTemplateDrivenValidationDirectivesComponent,
	PortMessageTemplateDrivenValidationDirectivesComponent,
	PortAddTemplateDrivenValidationDirectivesComponent,
  ],
entryComponents: [
	PortCompleteTemplateDrivenValidationDirectivesComponent,
	PortConditionalExpressionTemplateDrivenValidationDirectivesComponent,
	PortMessageTemplateDrivenValidationDirectivesComponent,
	PortAddTemplateDrivenValidationDirectivesComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	PortCompleteTemplateDrivenValidationDirectivesComponent,
	PortConditionalExpressionTemplateDrivenValidationDirectivesComponent,
	PortMessageTemplateDrivenValidationDirectivesComponent,
	PortAddTemplateDrivenValidationDirectivesComponent,
  ],

})
export class  PortTemplateDrivenValidationDirectivesExtendedModule { }
