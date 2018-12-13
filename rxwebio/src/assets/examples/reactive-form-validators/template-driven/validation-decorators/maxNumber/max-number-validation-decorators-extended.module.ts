import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { MaxNumberCompleteTemplateDrivenValidationDecoratorsComponent } from './complete/max-number-complete.component';
import { MaxNumberValueTemplateDrivenValidationDecoratorsComponent } from './value/max-number-value.component';
import { MaxNumberConditionalExpressionTemplateDrivenValidationDecoratorsComponent } from './conditionalExpression/max-number-conditional-expression.component';
import { MaxNumberMessageTemplateDrivenValidationDecoratorsComponent } from './message/max-number-message.component';
import { MaxNumberAddTemplateDrivenValidationDecoratorsComponent } from './add/max-number-add.component';

@NgModule({
  declarations: [
	MaxNumberCompleteTemplateDrivenValidationDecoratorsComponent,
	MaxNumberValueTemplateDrivenValidationDecoratorsComponent,
	MaxNumberConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	MaxNumberMessageTemplateDrivenValidationDecoratorsComponent,
	MaxNumberAddTemplateDrivenValidationDecoratorsComponent,
  ],
entryComponents: [
	MaxNumberCompleteTemplateDrivenValidationDecoratorsComponent,
	MaxNumberValueTemplateDrivenValidationDecoratorsComponent,
	MaxNumberConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	MaxNumberMessageTemplateDrivenValidationDecoratorsComponent,
	MaxNumberAddTemplateDrivenValidationDecoratorsComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	MaxNumberCompleteTemplateDrivenValidationDecoratorsComponent,
	MaxNumberValueTemplateDrivenValidationDecoratorsComponent,
	MaxNumberConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	MaxNumberMessageTemplateDrivenValidationDecoratorsComponent,
	MaxNumberAddTemplateDrivenValidationDecoratorsComponent,
  ],

})
export class  MaxNumberTemplateDrivenValidationDecoratorsExtendedModule { }
