import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { UrlCompleteTemplateDrivenComponent } from './complete/url-complete.component';
import { UrlConditionalExpressionTemplateDrivenComponent } from './conditionalExpression/url-conditional-expression.component';
import { UrlMessageTemplateDrivenComponent } from './message/url-message.component';
import { UrlAddTemplateDrivenComponent } from './add/url-add.component';

@NgModule({
  declarations: [
	UrlCompleteTemplateDrivenComponent,
	UrlConditionalExpressionTemplateDrivenComponent,
	UrlMessageTemplateDrivenComponent,
	UrlAddTemplateDrivenComponent,
  ],
entryComponents: [
	UrlCompleteTemplateDrivenComponent,
	UrlConditionalExpressionTemplateDrivenComponent,
	UrlMessageTemplateDrivenComponent,
	UrlAddTemplateDrivenComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	UrlCompleteTemplateDrivenComponent,
	UrlConditionalExpressionTemplateDrivenComponent,
	UrlMessageTemplateDrivenComponent,
	UrlAddTemplateDrivenComponent,
  ],

})
export class  UrlTemplateDrivenExtendedModule { }
