import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { PortCompleteTemplateDrivenValidationDecoratorsComponent } from './complete/port-complete.component';
import { PortConditionalExpressionTemplateDrivenValidationDecoratorsComponent } from './conditionalExpression/port-conditional-expression.component';
import { PortMessageTemplateDrivenValidationDecoratorsComponent } from './message/port-message.component';
import { PortAddTemplateDrivenValidationDecoratorsComponent } from './add/port-add.component';

@NgModule({
  declarations: [
	PortCompleteTemplateDrivenValidationDecoratorsComponent,
	PortConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	PortMessageTemplateDrivenValidationDecoratorsComponent,
	PortAddTemplateDrivenValidationDecoratorsComponent,
  ],
entryComponents: [
	PortCompleteTemplateDrivenValidationDecoratorsComponent,
	PortConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	PortMessageTemplateDrivenValidationDecoratorsComponent,
	PortAddTemplateDrivenValidationDecoratorsComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	PortCompleteTemplateDrivenValidationDecoratorsComponent,
	PortConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	PortMessageTemplateDrivenValidationDecoratorsComponent,
	PortAddTemplateDrivenValidationDecoratorsComponent,
  ],

})
export class  PortTemplateDrivenValidationDecoratorsExtendedModule { }
