import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { UrlCompleteTemplateDrivenValidationDecoratorsComponent } from './complete/url-complete.component';
import { UrlConditionalExpressionTemplateDrivenValidationDecoratorsComponent } from './conditionalExpression/url-conditional-expression.component';
import { UrlMessageTemplateDrivenValidationDecoratorsComponent } from './message/url-message.component';
import { UrlAddTemplateDrivenValidationDecoratorsComponent } from './add/url-add.component';

@NgModule({
  declarations: [
	UrlCompleteTemplateDrivenValidationDecoratorsComponent,
	UrlConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	UrlMessageTemplateDrivenValidationDecoratorsComponent,
	UrlAddTemplateDrivenValidationDecoratorsComponent,
  ],
entryComponents: [
	UrlCompleteTemplateDrivenValidationDecoratorsComponent,
	UrlConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	UrlMessageTemplateDrivenValidationDecoratorsComponent,
	UrlAddTemplateDrivenValidationDecoratorsComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	UrlCompleteTemplateDrivenValidationDecoratorsComponent,
	UrlConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	UrlMessageTemplateDrivenValidationDecoratorsComponent,
	UrlAddTemplateDrivenValidationDecoratorsComponent,
  ],

})
export class  UrlTemplateDrivenValidationDecoratorsExtendedModule { }
