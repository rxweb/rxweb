import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { PrimeNumberCompleteTemplateDrivenValidationDirectivesComponent } from './complete/prime-number-complete.component';
import { PrimeNumberConditionalExpressionTemplateDrivenValidationDirectivesComponent } from './conditionalExpression/prime-number-conditional-expression.component';
import { PrimeNumberMessageTemplateDrivenValidationDirectivesComponent } from './message/prime-number-message.component';
import { PrimeNumberAddTemplateDrivenValidationDirectivesComponent } from './add/prime-number-add.component';

@NgModule({
  declarations: [
	PrimeNumberCompleteTemplateDrivenValidationDirectivesComponent,
	PrimeNumberConditionalExpressionTemplateDrivenValidationDirectivesComponent,
	PrimeNumberMessageTemplateDrivenValidationDirectivesComponent,
	PrimeNumberAddTemplateDrivenValidationDirectivesComponent,
  ],
entryComponents: [
	PrimeNumberCompleteTemplateDrivenValidationDirectivesComponent,
	PrimeNumberConditionalExpressionTemplateDrivenValidationDirectivesComponent,
	PrimeNumberMessageTemplateDrivenValidationDirectivesComponent,
	PrimeNumberAddTemplateDrivenValidationDirectivesComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	PrimeNumberCompleteTemplateDrivenValidationDirectivesComponent,
	PrimeNumberConditionalExpressionTemplateDrivenValidationDirectivesComponent,
	PrimeNumberMessageTemplateDrivenValidationDirectivesComponent,
	PrimeNumberAddTemplateDrivenValidationDirectivesComponent,
  ],

})
export class  PrimeNumberTemplateDrivenValidationDirectivesExtendedModule { }
