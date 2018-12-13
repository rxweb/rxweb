import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { StartsWithCompleteTemplateDrivenValidationDirectivesComponent } from './complete/starts-with-complete.component';
import { StartsWithValueTemplateDrivenValidationDirectivesComponent } from './value/starts-with-value.component';
import { StartsWithConditionalExpressionTemplateDrivenValidationDirectivesComponent } from './conditionalExpression/starts-with-conditional-expression.component';
import { StartsWithMessageTemplateDrivenValidationDirectivesComponent } from './message/starts-with-message.component';
import { StartsWithAddTemplateDrivenValidationDirectivesComponent } from './add/starts-with-add.component';

@NgModule({
  declarations: [
	StartsWithCompleteTemplateDrivenValidationDirectivesComponent,
	StartsWithValueTemplateDrivenValidationDirectivesComponent,
	StartsWithConditionalExpressionTemplateDrivenValidationDirectivesComponent,
	StartsWithMessageTemplateDrivenValidationDirectivesComponent,
	StartsWithAddTemplateDrivenValidationDirectivesComponent,
  ],
entryComponents: [
	StartsWithCompleteTemplateDrivenValidationDirectivesComponent,
	StartsWithValueTemplateDrivenValidationDirectivesComponent,
	StartsWithConditionalExpressionTemplateDrivenValidationDirectivesComponent,
	StartsWithMessageTemplateDrivenValidationDirectivesComponent,
	StartsWithAddTemplateDrivenValidationDirectivesComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	StartsWithCompleteTemplateDrivenValidationDirectivesComponent,
	StartsWithValueTemplateDrivenValidationDirectivesComponent,
	StartsWithConditionalExpressionTemplateDrivenValidationDirectivesComponent,
	StartsWithMessageTemplateDrivenValidationDirectivesComponent,
	StartsWithAddTemplateDrivenValidationDirectivesComponent,
  ],

})
export class  StartsWithTemplateDrivenValidationDirectivesExtendedModule { }
