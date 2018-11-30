import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { AlphaCompleteTemplateDrivenComponent } from './complete/alpha-complete.component';
import { AlphaConditionalExpressionTemplateDrivenComponent } from './conditionalExpression/alpha-conditional-expression.component';
import { AlphaAllowWhiteSpaceTemplateDrivenComponent } from './allowWhiteSpace/alpha-allow-white-space.component';
import { AlphaMessageTemplateDrivenComponent } from './message/alpha-message.component';
import { AlphaAddTemplateDrivenComponent } from './add/alpha-add.component';

@NgModule({
  declarations: [
	AlphaCompleteTemplateDrivenComponent,
	AlphaConditionalExpressionTemplateDrivenComponent,
	AlphaAllowWhiteSpaceTemplateDrivenComponent,
	AlphaMessageTemplateDrivenComponent,
	AlphaAddTemplateDrivenComponent,
  ],
entryComponents: [
	AlphaCompleteTemplateDrivenComponent,
	AlphaConditionalExpressionTemplateDrivenComponent,
	AlphaAllowWhiteSpaceTemplateDrivenComponent,
	AlphaMessageTemplateDrivenComponent,
	AlphaAddTemplateDrivenComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	AlphaCompleteTemplateDrivenComponent,
	AlphaConditionalExpressionTemplateDrivenComponent,
	AlphaAllowWhiteSpaceTemplateDrivenComponent,
	AlphaMessageTemplateDrivenComponent,
	AlphaAddTemplateDrivenComponent,
  ],

})
export class  AlphaTemplateDrivenExtendedModule { }
