import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { MaxNumberCompleteTemplateDrivenValidationDirectivesComponent } from './complete/max-number-complete.component';
import { MaxNumberValueTemplateDrivenValidationDirectivesComponent } from './value/max-number-value.component';
import { MaxNumberConditionalExpressionTemplateDrivenValidationDirectivesComponent } from './conditionalExpression/max-number-conditional-expression.component';
import { MaxNumberMessageTemplateDrivenValidationDirectivesComponent } from './message/max-number-message.component';
import { MaxNumberAddTemplateDrivenValidationDirectivesComponent } from './add/max-number-add.component';

@NgModule({
  declarations: [
	MaxNumberCompleteTemplateDrivenValidationDirectivesComponent,
	MaxNumberValueTemplateDrivenValidationDirectivesComponent,
	MaxNumberConditionalExpressionTemplateDrivenValidationDirectivesComponent,
	MaxNumberMessageTemplateDrivenValidationDirectivesComponent,
	MaxNumberAddTemplateDrivenValidationDirectivesComponent,
  ],
entryComponents: [
	MaxNumberCompleteTemplateDrivenValidationDirectivesComponent,
	MaxNumberValueTemplateDrivenValidationDirectivesComponent,
	MaxNumberConditionalExpressionTemplateDrivenValidationDirectivesComponent,
	MaxNumberMessageTemplateDrivenValidationDirectivesComponent,
	MaxNumberAddTemplateDrivenValidationDirectivesComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	MaxNumberCompleteTemplateDrivenValidationDirectivesComponent,
	MaxNumberValueTemplateDrivenValidationDirectivesComponent,
	MaxNumberConditionalExpressionTemplateDrivenValidationDirectivesComponent,
	MaxNumberMessageTemplateDrivenValidationDirectivesComponent,
	MaxNumberAddTemplateDrivenValidationDirectivesComponent,
  ],

})
export class  MaxNumberTemplateDrivenValidationDirectivesExtendedModule { }
