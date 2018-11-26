import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { DataUriCompleteTemplateDrivenComponent } from './complete/data-uri-complete.component';
import { DataUriConditionalExpressionTemplateDrivenComponent } from './conditionalExpression/data-uri-conditional-expression.component';
import { DataUriMessageTemplateDrivenComponent } from './message/data-uri-message.component';
import { DataUriAddTemplateDrivenComponent } from './add/data-uri-add.component';

@NgModule({
  declarations: [
	DataUriCompleteTemplateDrivenComponent,
	DataUriConditionalExpressionTemplateDrivenComponent,
	DataUriMessageTemplateDrivenComponent,
	DataUriAddTemplateDrivenComponent,
  ],
entryComponents: [
	DataUriCompleteTemplateDrivenComponent,
	DataUriConditionalExpressionTemplateDrivenComponent,
	DataUriMessageTemplateDrivenComponent,
	DataUriAddTemplateDrivenComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	DataUriCompleteTemplateDrivenComponent,
	DataUriConditionalExpressionTemplateDrivenComponent,
	DataUriMessageTemplateDrivenComponent,
	DataUriAddTemplateDrivenComponent,
  ],

})
export class  DataUriTemplateDrivenExtendedModule { }
