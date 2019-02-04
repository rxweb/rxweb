import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { CusipCompleteTemplateDrivenValidationDecoratorsComponent } from './complete/cusip-complete.component';
import { CusipConditionalExpressionTemplateDrivenValidationDecoratorsComponent } from './conditionalExpression/cusip-conditional-expression.component';
import { CusipMessageTemplateDrivenValidationDecoratorsComponent } from './message/cusip-message.component';
import { CusipAddTemplateDrivenValidationDecoratorsComponent } from './add/cusip-add.component';

@NgModule({
  declarations: [
	CusipCompleteTemplateDrivenValidationDecoratorsComponent,
	CusipConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	CusipMessageTemplateDrivenValidationDecoratorsComponent,
	CusipAddTemplateDrivenValidationDecoratorsComponent,
  ],
entryComponents: [
	CusipCompleteTemplateDrivenValidationDecoratorsComponent,
	CusipConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	CusipMessageTemplateDrivenValidationDecoratorsComponent,
	CusipAddTemplateDrivenValidationDecoratorsComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	CusipCompleteTemplateDrivenValidationDecoratorsComponent,
	CusipConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	CusipMessageTemplateDrivenValidationDecoratorsComponent,
	CusipAddTemplateDrivenValidationDecoratorsComponent,
  ],

})
export class  CusipTemplateDrivenValidationDecoratorsExtendedModule { }
