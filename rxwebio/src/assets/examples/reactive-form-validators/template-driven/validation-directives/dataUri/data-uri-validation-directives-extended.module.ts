import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { DataUriCompleteTemplateDrivenValidationDirectivesComponent } from './complete/data-uri-complete.component';
import { DataUriConditionalExpressionTemplateDrivenValidationDirectivesComponent } from './conditionalExpression/data-uri-conditional-expression.component';
import { DataUriMessageTemplateDrivenValidationDirectivesComponent } from './message/data-uri-message.component';
import { DataUriAddTemplateDrivenValidationDirectivesComponent } from './add/data-uri-add.component';

@NgModule({
  declarations: [
	DataUriCompleteTemplateDrivenValidationDirectivesComponent,
	DataUriConditionalExpressionTemplateDrivenValidationDirectivesComponent,
	DataUriMessageTemplateDrivenValidationDirectivesComponent,
	DataUriAddTemplateDrivenValidationDirectivesComponent,
  ],
entryComponents: [
	DataUriCompleteTemplateDrivenValidationDirectivesComponent,
	DataUriConditionalExpressionTemplateDrivenValidationDirectivesComponent,
	DataUriMessageTemplateDrivenValidationDirectivesComponent,
	DataUriAddTemplateDrivenValidationDirectivesComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	DataUriCompleteTemplateDrivenValidationDirectivesComponent,
	DataUriConditionalExpressionTemplateDrivenValidationDirectivesComponent,
	DataUriMessageTemplateDrivenValidationDirectivesComponent,
	DataUriAddTemplateDrivenValidationDirectivesComponent,
  ],

})
export class  DataUriTemplateDrivenValidationDirectivesExtendedModule { }
