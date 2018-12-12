import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { RequiredCompleteTemplateDrivenValidationDecoratorsComponent } from './complete/required-complete.component';
import { RequiredConditionalExpressionTemplateDrivenValidationDecoratorsComponent } from './conditionalExpression/required-conditional-expression.component';
import { RequiredMessageTemplateDrivenValidationDecoratorsComponent } from './message/required-message.component';
import { RequiredAddTemplateDrivenValidationDecoratorsComponent } from './add/required-add.component';

@NgModule({
  declarations: [
	RequiredCompleteTemplateDrivenValidationDecoratorsComponent,
	RequiredConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	RequiredMessageTemplateDrivenValidationDecoratorsComponent,
	RequiredAddTemplateDrivenValidationDecoratorsComponent,
  ],
entryComponents: [
	RequiredCompleteTemplateDrivenValidationDecoratorsComponent,
	RequiredConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	RequiredMessageTemplateDrivenValidationDecoratorsComponent,
	RequiredAddTemplateDrivenValidationDecoratorsComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	RequiredCompleteTemplateDrivenValidationDecoratorsComponent,
	RequiredConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	RequiredMessageTemplateDrivenValidationDecoratorsComponent,
	RequiredAddTemplateDrivenValidationDecoratorsComponent,
  ],

})
export class  RequiredTemplateDrivenValidationDecoratorsExtendedModule { }
