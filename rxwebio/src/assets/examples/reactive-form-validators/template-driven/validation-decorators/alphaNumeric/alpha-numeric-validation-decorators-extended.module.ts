import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { AlphaNumericCompleteTemplateDrivenValidationDecoratorsComponent } from './complete/alpha-numeric-complete.component';
import { AlphaNumericAllowWhiteSpaceTemplateDrivenValidationDecoratorsComponent } from './allowWhiteSpace/alpha-numeric-allow-white-space.component';
import { AlphaNumericMessageTemplateDrivenValidationDecoratorsComponent } from './message/alpha-numeric-message.component';
import { AlphaNumericConditionalExpressionTemplateDrivenValidationDecoratorsComponent } from './conditionalExpression/alpha-numeric-conditional-expression.component';
import { AlphaNumericAddTemplateDrivenValidationDecoratorsComponent } from './add/alpha-numeric-add.component';

@NgModule({
  declarations: [
	AlphaNumericCompleteTemplateDrivenValidationDecoratorsComponent,
	AlphaNumericAllowWhiteSpaceTemplateDrivenValidationDecoratorsComponent,
	AlphaNumericMessageTemplateDrivenValidationDecoratorsComponent,
	AlphaNumericConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	AlphaNumericAddTemplateDrivenValidationDecoratorsComponent,
  ],
entryComponents: [
	AlphaNumericCompleteTemplateDrivenValidationDecoratorsComponent,
	AlphaNumericAllowWhiteSpaceTemplateDrivenValidationDecoratorsComponent,
	AlphaNumericMessageTemplateDrivenValidationDecoratorsComponent,
	AlphaNumericConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	AlphaNumericAddTemplateDrivenValidationDecoratorsComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	AlphaNumericCompleteTemplateDrivenValidationDecoratorsComponent,
	AlphaNumericAllowWhiteSpaceTemplateDrivenValidationDecoratorsComponent,
	AlphaNumericMessageTemplateDrivenValidationDecoratorsComponent,
	AlphaNumericConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	AlphaNumericAddTemplateDrivenValidationDecoratorsComponent,
  ],

})
export class  AlphaNumericTemplateDrivenValidationDecoratorsExtendedModule { }
