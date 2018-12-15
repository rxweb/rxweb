import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { OddCompleteTemplateDrivenValidationDirectivesComponent } from './complete/odd-complete.component';
import { OddConditionalExpressionTemplateDrivenValidationDirectivesComponent } from './conditionalExpression/odd-conditional-expression.component';
import { OddMessageTemplateDrivenValidationDirectivesComponent } from './message/odd-message.component';
import { OddAddTemplateDrivenValidationDirectivesComponent } from './add/odd-add.component';

@NgModule({
  declarations: [
	OddCompleteTemplateDrivenValidationDirectivesComponent,
	OddConditionalExpressionTemplateDrivenValidationDirectivesComponent,
	OddMessageTemplateDrivenValidationDirectivesComponent,
	OddAddTemplateDrivenValidationDirectivesComponent,
  ],
entryComponents: [
	OddCompleteTemplateDrivenValidationDirectivesComponent,
	OddConditionalExpressionTemplateDrivenValidationDirectivesComponent,
	OddMessageTemplateDrivenValidationDirectivesComponent,
	OddAddTemplateDrivenValidationDirectivesComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	OddCompleteTemplateDrivenValidationDirectivesComponent,
	OddConditionalExpressionTemplateDrivenValidationDirectivesComponent,
	OddMessageTemplateDrivenValidationDirectivesComponent,
	OddAddTemplateDrivenValidationDirectivesComponent,
  ],

})
export class  OddTemplateDrivenValidationDirectivesExtendedModule { }
