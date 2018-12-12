import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { AlphaCompleteTemplateDrivenValidationDecoratorsComponent } from './complete/alpha-complete.component';
import { AlphaConditionalExpressionTemplateDrivenValidationDecoratorsComponent } from './conditionalExpression/alpha-conditional-expression.component';
import { AlphaAllowWhiteSpaceTemplateDrivenValidationDecoratorsComponent } from './allowWhiteSpace/alpha-allow-white-space.component';
import { AlphaMessageTemplateDrivenValidationDecoratorsComponent } from './message/alpha-message.component';
import { AlphaAddTemplateDrivenValidationDecoratorsComponent } from './add/alpha-add.component';

@NgModule({
  declarations: [
	AlphaCompleteTemplateDrivenValidationDecoratorsComponent,
	AlphaConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	AlphaAllowWhiteSpaceTemplateDrivenValidationDecoratorsComponent,
	AlphaMessageTemplateDrivenValidationDecoratorsComponent,
	AlphaAddTemplateDrivenValidationDecoratorsComponent,
  ],
entryComponents: [
	AlphaCompleteTemplateDrivenValidationDecoratorsComponent,
	AlphaConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	AlphaAllowWhiteSpaceTemplateDrivenValidationDecoratorsComponent,
	AlphaMessageTemplateDrivenValidationDecoratorsComponent,
	AlphaAddTemplateDrivenValidationDecoratorsComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	AlphaCompleteTemplateDrivenValidationDecoratorsComponent,
	AlphaConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	AlphaAllowWhiteSpaceTemplateDrivenValidationDecoratorsComponent,
	AlphaMessageTemplateDrivenValidationDecoratorsComponent,
	AlphaAddTemplateDrivenValidationDecoratorsComponent,
  ],

})
export class  AlphaTemplateDrivenValidationDecoratorsExtendedModule { }
