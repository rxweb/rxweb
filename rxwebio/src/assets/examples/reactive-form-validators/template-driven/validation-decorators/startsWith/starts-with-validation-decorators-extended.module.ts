import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { StartsWithCompleteTemplateDrivenValidationDecoratorsComponent } from './complete/starts-with-complete.component';
import { StartsWithValueTemplateDrivenValidationDecoratorsComponent } from './value/starts-with-value.component';
import { StartsWithConditionalExpressionTemplateDrivenValidationDecoratorsComponent } from './conditionalExpression/starts-with-conditional-expression.component';
import { StartsWithMessageTemplateDrivenValidationDecoratorsComponent } from './message/starts-with-message.component';
import { StartsWithAddTemplateDrivenValidationDecoratorsComponent } from './add/starts-with-add.component';

@NgModule({
  declarations: [
	StartsWithCompleteTemplateDrivenValidationDecoratorsComponent,
	StartsWithValueTemplateDrivenValidationDecoratorsComponent,
	StartsWithConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	StartsWithMessageTemplateDrivenValidationDecoratorsComponent,
	StartsWithAddTemplateDrivenValidationDecoratorsComponent,
  ],
entryComponents: [
	StartsWithCompleteTemplateDrivenValidationDecoratorsComponent,
	StartsWithValueTemplateDrivenValidationDecoratorsComponent,
	StartsWithConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	StartsWithMessageTemplateDrivenValidationDecoratorsComponent,
	StartsWithAddTemplateDrivenValidationDecoratorsComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	StartsWithCompleteTemplateDrivenValidationDecoratorsComponent,
	StartsWithValueTemplateDrivenValidationDecoratorsComponent,
	StartsWithConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	StartsWithMessageTemplateDrivenValidationDecoratorsComponent,
	StartsWithAddTemplateDrivenValidationDecoratorsComponent,
  ],

})
export class  StartsWithTemplateDrivenValidationDecoratorsExtendedModule { }
