import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { MinLengthCompleteTemplateDrivenValidationDirectivesComponent } from './complete/min-length-complete.component';
import { MinLengthValueTemplateDrivenValidationDirectivesComponent } from './value/min-length-value.component';
import { MinLengthMessageTemplateDrivenValidationDirectivesComponent } from './message/min-length-message.component';
import { MinLengthConditionalExpressionTemplateDrivenValidationDirectivesComponent } from './conditionalExpression/min-length-conditional-expression.component';
import { MinLengthAddTemplateDrivenValidationDirectivesComponent } from './add/min-length-add.component';

@NgModule({
  declarations: [
	MinLengthCompleteTemplateDrivenValidationDirectivesComponent,
	MinLengthValueTemplateDrivenValidationDirectivesComponent,
	MinLengthMessageTemplateDrivenValidationDirectivesComponent,
	MinLengthConditionalExpressionTemplateDrivenValidationDirectivesComponent,
	MinLengthAddTemplateDrivenValidationDirectivesComponent,
  ],
entryComponents: [
	MinLengthCompleteTemplateDrivenValidationDirectivesComponent,
	MinLengthValueTemplateDrivenValidationDirectivesComponent,
	MinLengthMessageTemplateDrivenValidationDirectivesComponent,
	MinLengthConditionalExpressionTemplateDrivenValidationDirectivesComponent,
	MinLengthAddTemplateDrivenValidationDirectivesComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	MinLengthCompleteTemplateDrivenValidationDirectivesComponent,
	MinLengthValueTemplateDrivenValidationDirectivesComponent,
	MinLengthMessageTemplateDrivenValidationDirectivesComponent,
	MinLengthConditionalExpressionTemplateDrivenValidationDirectivesComponent,
	MinLengthAddTemplateDrivenValidationDirectivesComponent,
  ],

})
export class  MinLengthTemplateDrivenValidationDirectivesExtendedModule { }
