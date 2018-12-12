import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { MinNumberCompleteTemplateDrivenValidationDirectivesComponent } from './complete/min-number-complete.component';
import { MinNumberValueTemplateDrivenValidationDirectivesComponent } from './value/min-number-value.component';
import { MinNumberMessageTemplateDrivenValidationDirectivesComponent } from './message/min-number-message.component';
import { MinNumberConditionalExpressionTemplateDrivenValidationDirectivesComponent } from './conditionalExpression/min-number-conditional-expression.component';
import { MinNumberAddTemplateDrivenValidationDirectivesComponent } from './add/min-number-add.component';

@NgModule({
  declarations: [
	MinNumberCompleteTemplateDrivenValidationDirectivesComponent,
	MinNumberValueTemplateDrivenValidationDirectivesComponent,
	MinNumberMessageTemplateDrivenValidationDirectivesComponent,
	MinNumberConditionalExpressionTemplateDrivenValidationDirectivesComponent,
	MinNumberAddTemplateDrivenValidationDirectivesComponent,
  ],
entryComponents: [
	MinNumberCompleteTemplateDrivenValidationDirectivesComponent,
	MinNumberValueTemplateDrivenValidationDirectivesComponent,
	MinNumberMessageTemplateDrivenValidationDirectivesComponent,
	MinNumberConditionalExpressionTemplateDrivenValidationDirectivesComponent,
	MinNumberAddTemplateDrivenValidationDirectivesComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	MinNumberCompleteTemplateDrivenValidationDirectivesComponent,
	MinNumberValueTemplateDrivenValidationDirectivesComponent,
	MinNumberMessageTemplateDrivenValidationDirectivesComponent,
	MinNumberConditionalExpressionTemplateDrivenValidationDirectivesComponent,
	MinNumberAddTemplateDrivenValidationDirectivesComponent,
  ],

})
export class  MinNumberTemplateDrivenValidationDirectivesExtendedModule { }
