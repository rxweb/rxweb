import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { EvenCompleteTemplateDrivenValidationDirectivesComponent } from './complete/even-complete.component';
import { EvenConditionalExpressionTemplateDrivenValidationDirectivesComponent } from './conditionalExpression/even-conditional-expression.component';
import { EvenMessageTemplateDrivenValidationDirectivesComponent } from './message/even-message.component';
import { EvenAddTemplateDrivenValidationDirectivesComponent } from './add/even-add.component';

@NgModule({
  declarations: [
	EvenCompleteTemplateDrivenValidationDirectivesComponent,
	EvenConditionalExpressionTemplateDrivenValidationDirectivesComponent,
	EvenMessageTemplateDrivenValidationDirectivesComponent,
	EvenAddTemplateDrivenValidationDirectivesComponent,
  ],
entryComponents: [
	EvenCompleteTemplateDrivenValidationDirectivesComponent,
	EvenConditionalExpressionTemplateDrivenValidationDirectivesComponent,
	EvenMessageTemplateDrivenValidationDirectivesComponent,
	EvenAddTemplateDrivenValidationDirectivesComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	EvenCompleteTemplateDrivenValidationDirectivesComponent,
	EvenConditionalExpressionTemplateDrivenValidationDirectivesComponent,
	EvenMessageTemplateDrivenValidationDirectivesComponent,
	EvenAddTemplateDrivenValidationDirectivesComponent,
  ],

})
export class  EvenTemplateDrivenValidationDirectivesExtendedModule { }
