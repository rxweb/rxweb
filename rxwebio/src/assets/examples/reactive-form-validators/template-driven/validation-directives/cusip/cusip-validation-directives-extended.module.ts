import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { CusipCompleteTemplateDrivenValidationDirectivesComponent } from './complete/cusip-complete.component';
import { CusipConditionalExpressionTemplateDrivenValidationDirectivesComponent } from './conditionalExpression/cusip-conditional-expression.component';
import { CusipMessageTemplateDrivenValidationDirectivesComponent } from './message/cusip-message.component';
import { CusipAddTemplateDrivenValidationDirectivesComponent } from './add/cusip-add.component';

@NgModule({
  declarations: [
	CusipCompleteTemplateDrivenValidationDirectivesComponent,
	CusipConditionalExpressionTemplateDrivenValidationDirectivesComponent,
	CusipMessageTemplateDrivenValidationDirectivesComponent,
	CusipAddTemplateDrivenValidationDirectivesComponent,
  ],
entryComponents: [
	CusipCompleteTemplateDrivenValidationDirectivesComponent,
	CusipConditionalExpressionTemplateDrivenValidationDirectivesComponent,
	CusipMessageTemplateDrivenValidationDirectivesComponent,
	CusipAddTemplateDrivenValidationDirectivesComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	CusipCompleteTemplateDrivenValidationDirectivesComponent,
	CusipConditionalExpressionTemplateDrivenValidationDirectivesComponent,
	CusipMessageTemplateDrivenValidationDirectivesComponent,
	CusipAddTemplateDrivenValidationDirectivesComponent,
  ],

})
export class  CusipTemplateDrivenValidationDirectivesExtendedModule { }
