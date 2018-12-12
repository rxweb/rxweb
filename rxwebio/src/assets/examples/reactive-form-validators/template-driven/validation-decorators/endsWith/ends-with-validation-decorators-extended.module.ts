import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { EndsWithCompleteTemplateDrivenValidationDecoratorsComponent } from './complete/ends-with-complete.component';
import { EndsWithValueTemplateDrivenValidationDecoratorsComponent } from './value/ends-with-value.component';
import { EndsWithConditionalExpressionTemplateDrivenValidationDecoratorsComponent } from './conditionalExpression/ends-with-conditional-expression.component';
import { EndsWithMessageTemplateDrivenValidationDecoratorsComponent } from './message/ends-with-message.component';
import { EndsWithAddTemplateDrivenValidationDecoratorsComponent } from './add/ends-with-add.component';

@NgModule({
  declarations: [
	EndsWithCompleteTemplateDrivenValidationDecoratorsComponent,
	EndsWithValueTemplateDrivenValidationDecoratorsComponent,
	EndsWithConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	EndsWithMessageTemplateDrivenValidationDecoratorsComponent,
	EndsWithAddTemplateDrivenValidationDecoratorsComponent,
  ],
entryComponents: [
	EndsWithCompleteTemplateDrivenValidationDecoratorsComponent,
	EndsWithValueTemplateDrivenValidationDecoratorsComponent,
	EndsWithConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	EndsWithMessageTemplateDrivenValidationDecoratorsComponent,
	EndsWithAddTemplateDrivenValidationDecoratorsComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	EndsWithCompleteTemplateDrivenValidationDecoratorsComponent,
	EndsWithValueTemplateDrivenValidationDecoratorsComponent,
	EndsWithConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	EndsWithMessageTemplateDrivenValidationDecoratorsComponent,
	EndsWithAddTemplateDrivenValidationDecoratorsComponent,
  ],

})
export class  EndsWithTemplateDrivenValidationDecoratorsExtendedModule { }
