import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { DataUriCompleteTemplateDrivenValidationDecoratorsComponent } from './complete/data-uri-complete.component';
import { DataUriConditionalExpressionTemplateDrivenValidationDecoratorsComponent } from './conditionalExpression/data-uri-conditional-expression.component';
import { DataUriMessageTemplateDrivenValidationDecoratorsComponent } from './message/data-uri-message.component';
import { DataUriAddTemplateDrivenValidationDecoratorsComponent } from './add/data-uri-add.component';

@NgModule({
  declarations: [
	DataUriCompleteTemplateDrivenValidationDecoratorsComponent,
	DataUriConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	DataUriMessageTemplateDrivenValidationDecoratorsComponent,
	DataUriAddTemplateDrivenValidationDecoratorsComponent,
  ],
entryComponents: [
	DataUriCompleteTemplateDrivenValidationDecoratorsComponent,
	DataUriConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	DataUriMessageTemplateDrivenValidationDecoratorsComponent,
	DataUriAddTemplateDrivenValidationDecoratorsComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	DataUriCompleteTemplateDrivenValidationDecoratorsComponent,
	DataUriConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	DataUriMessageTemplateDrivenValidationDecoratorsComponent,
	DataUriAddTemplateDrivenValidationDecoratorsComponent,
  ],

})
export class  DataUriTemplateDrivenValidationDecoratorsExtendedModule { }
