import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { UrlCompleteValidatorComponent } from './complete/url-complete.component';
import { UrlConditionalExpressionValidatorComponent } from './conditionalExpression/url-conditional-expression.component';
import { UrlMessageValidatorComponent } from './message/url-message.component';
import { UrlDynamicValidatorComponent } from './dynamic/url-dynamic.component';
import { UrlAddValidatorComponent } from './add/url-add.component';

@NgModule({
  declarations: [
	UrlCompleteValidatorComponent,
	UrlConditionalExpressionValidatorComponent,
	UrlMessageValidatorComponent,
	UrlDynamicValidatorComponent,
	UrlAddValidatorComponent,
  ],
entryComponents: [
	UrlCompleteValidatorComponent,
	UrlConditionalExpressionValidatorComponent,
	UrlMessageValidatorComponent,
	UrlDynamicValidatorComponent,
	UrlAddValidatorComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	UrlCompleteValidatorComponent,
	UrlConditionalExpressionValidatorComponent,
	UrlMessageValidatorComponent,
	UrlDynamicValidatorComponent,
	UrlAddValidatorComponent,
  ],

})
export class  UrlExtendedModule { }
