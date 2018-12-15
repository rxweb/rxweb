import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { UrlCompleteTemplateDrivenValidationDirectivesComponent } from './complete/url-complete.component';
import { UrlConditionalExpressionTemplateDrivenValidationDirectivesComponent } from './conditionalExpression/url-conditional-expression.component';
import { UrlMessageTemplateDrivenValidationDirectivesComponent } from './message/url-message.component';
import { UrlAddTemplateDrivenValidationDirectivesComponent } from './add/url-add.component';

@NgModule({
  declarations: [
	UrlCompleteTemplateDrivenValidationDirectivesComponent,
	UrlConditionalExpressionTemplateDrivenValidationDirectivesComponent,
	UrlMessageTemplateDrivenValidationDirectivesComponent,
	UrlAddTemplateDrivenValidationDirectivesComponent,
  ],
entryComponents: [
	UrlCompleteTemplateDrivenValidationDirectivesComponent,
	UrlConditionalExpressionTemplateDrivenValidationDirectivesComponent,
	UrlMessageTemplateDrivenValidationDirectivesComponent,
	UrlAddTemplateDrivenValidationDirectivesComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	UrlCompleteTemplateDrivenValidationDirectivesComponent,
	UrlConditionalExpressionTemplateDrivenValidationDirectivesComponent,
	UrlMessageTemplateDrivenValidationDirectivesComponent,
	UrlAddTemplateDrivenValidationDirectivesComponent,
  ],

})
export class  UrlTemplateDrivenValidationDirectivesExtendedModule { }
