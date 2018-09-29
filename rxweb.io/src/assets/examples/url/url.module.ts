import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { UrlCompleteComponent } from './complete/url-complete.component';
import { UrlConditionalExpressionsComponent } from './conditionalExpressions/url-conditional-expressions.component';
import { UrlMessageComponent } from './message/url-message.component';
import { UrlAddComponent } from './add/url-add.component';
import { UrlEditComponent } from './edit/url-edit.component';

@NgModule({
  declarations: [
	UrlCompleteComponent,
	UrlConditionalExpressionsComponent,
	UrlMessageComponent,
	UrlAddComponent,
	UrlEditComponent,
  ],
entryComponents: [
	UrlCompleteComponent,
	UrlConditionalExpressionsComponent,
	UrlMessageComponent,
	UrlAddComponent,
	UrlEditComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	UrlCompleteComponent,
	UrlConditionalExpressionsComponent,
	UrlMessageComponent,
	UrlAddComponent,
	UrlEditComponent,
  ],

})
export class  UrlExtendedModule { }
