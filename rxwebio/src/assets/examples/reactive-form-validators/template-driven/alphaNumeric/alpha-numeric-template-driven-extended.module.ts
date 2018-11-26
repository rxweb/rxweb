import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { AlphaNumericCompleteTemplateDrivenComponent } from './complete/alpha-numeric-complete.component';
import { AlphaNumericAllowWhiteSpaceTemplateDrivenComponent } from './allowWhiteSpace/alpha-numeric-allow-white-space.component';
import { AlphaNumericMessageTemplateDrivenComponent } from './message/alpha-numeric-message.component';
import { AlphaNumericConditionalExpressionTemplateDrivenComponent } from './conditionalExpression/alpha-numeric-conditional-expression.component';
import { AlphaNumericAddTemplateDrivenComponent } from './add/alpha-numeric-add.component';

@NgModule({
  declarations: [
	AlphaNumericCompleteTemplateDrivenComponent,
	AlphaNumericAllowWhiteSpaceTemplateDrivenComponent,
	AlphaNumericMessageTemplateDrivenComponent,
	AlphaNumericConditionalExpressionTemplateDrivenComponent,
	AlphaNumericAddTemplateDrivenComponent,
  ],
entryComponents: [
	AlphaNumericCompleteTemplateDrivenComponent,
	AlphaNumericAllowWhiteSpaceTemplateDrivenComponent,
	AlphaNumericMessageTemplateDrivenComponent,
	AlphaNumericConditionalExpressionTemplateDrivenComponent,
	AlphaNumericAddTemplateDrivenComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	AlphaNumericCompleteTemplateDrivenComponent,
	AlphaNumericAllowWhiteSpaceTemplateDrivenComponent,
	AlphaNumericMessageTemplateDrivenComponent,
	AlphaNumericConditionalExpressionTemplateDrivenComponent,
	AlphaNumericAddTemplateDrivenComponent,
  ],

})
export class  AlphaNumericTemplateDrivenExtendedModule { }
