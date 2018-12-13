import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { EvenCompleteTemplateDrivenValidationDecoratorsComponent } from './complete/even-complete.component';
import { EvenConditionalExpressionTemplateDrivenValidationDecoratorsComponent } from './conditionalExpression/even-conditional-expression.component';
import { EvenMessageTemplateDrivenValidationDecoratorsComponent } from './message/even-message.component';
import { EvenAddTemplateDrivenValidationDecoratorsComponent } from './add/even-add.component';

@NgModule({
  declarations: [
	EvenCompleteTemplateDrivenValidationDecoratorsComponent,
	EvenConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	EvenMessageTemplateDrivenValidationDecoratorsComponent,
	EvenAddTemplateDrivenValidationDecoratorsComponent,
  ],
entryComponents: [
	EvenCompleteTemplateDrivenValidationDecoratorsComponent,
	EvenConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	EvenMessageTemplateDrivenValidationDecoratorsComponent,
	EvenAddTemplateDrivenValidationDecoratorsComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	EvenCompleteTemplateDrivenValidationDecoratorsComponent,
	EvenConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	EvenMessageTemplateDrivenValidationDecoratorsComponent,
	EvenAddTemplateDrivenValidationDecoratorsComponent,
  ],

})
export class  EvenTemplateDrivenValidationDecoratorsExtendedModule { }
