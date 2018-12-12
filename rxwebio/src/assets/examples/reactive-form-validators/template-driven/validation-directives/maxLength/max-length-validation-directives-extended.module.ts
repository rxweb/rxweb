import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { MaxLengthCompleteTemplateDrivenValidationDirectivesComponent } from './complete/max-length-complete.component';
import { MaxLengthValueTemplateDrivenValidationDirectivesComponent } from './value/max-length-value.component';
import { MaxLengthConditionalExpressionTemplateDrivenValidationDirectivesComponent } from './conditionalExpression/max-length-conditional-expression.component';
import { MaxLengthMessageTemplateDrivenValidationDirectivesComponent } from './message/max-length-message.component';
import { MaxLengthAddTemplateDrivenValidationDirectivesComponent } from './add/max-length-add.component';

@NgModule({
  declarations: [
	MaxLengthCompleteTemplateDrivenValidationDirectivesComponent,
	MaxLengthValueTemplateDrivenValidationDirectivesComponent,
	MaxLengthConditionalExpressionTemplateDrivenValidationDirectivesComponent,
	MaxLengthMessageTemplateDrivenValidationDirectivesComponent,
	MaxLengthAddTemplateDrivenValidationDirectivesComponent,
  ],
entryComponents: [
	MaxLengthCompleteTemplateDrivenValidationDirectivesComponent,
	MaxLengthValueTemplateDrivenValidationDirectivesComponent,
	MaxLengthConditionalExpressionTemplateDrivenValidationDirectivesComponent,
	MaxLengthMessageTemplateDrivenValidationDirectivesComponent,
	MaxLengthAddTemplateDrivenValidationDirectivesComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	MaxLengthCompleteTemplateDrivenValidationDirectivesComponent,
	MaxLengthValueTemplateDrivenValidationDirectivesComponent,
	MaxLengthConditionalExpressionTemplateDrivenValidationDirectivesComponent,
	MaxLengthMessageTemplateDrivenValidationDirectivesComponent,
	MaxLengthAddTemplateDrivenValidationDirectivesComponent,
  ],

})
export class  MaxLengthTemplateDrivenValidationDirectivesExtendedModule { }
