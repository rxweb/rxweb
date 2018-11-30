import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { LowerCaseCompleteTemplateDrivenComponent } from './complete/lower-case-complete.component';
import { LowerCaseConditionalExpressionTemplateDrivenComponent } from './conditionalExpression/lower-case-conditional-expression.component';
import { LowerCaseMessageTemplateDrivenComponent } from './message/lower-case-message.component';
import { LowerCaseAddTemplateDrivenComponent } from './add/lower-case-add.component';

@NgModule({
  declarations: [
	LowerCaseCompleteTemplateDrivenComponent,
	LowerCaseConditionalExpressionTemplateDrivenComponent,
	LowerCaseMessageTemplateDrivenComponent,
	LowerCaseAddTemplateDrivenComponent,
  ],
entryComponents: [
	LowerCaseCompleteTemplateDrivenComponent,
	LowerCaseConditionalExpressionTemplateDrivenComponent,
	LowerCaseMessageTemplateDrivenComponent,
	LowerCaseAddTemplateDrivenComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	LowerCaseCompleteTemplateDrivenComponent,
	LowerCaseConditionalExpressionTemplateDrivenComponent,
	LowerCaseMessageTemplateDrivenComponent,
	LowerCaseAddTemplateDrivenComponent,
  ],

})
export class  LowerCaseTemplateDrivenExtendedModule { }
