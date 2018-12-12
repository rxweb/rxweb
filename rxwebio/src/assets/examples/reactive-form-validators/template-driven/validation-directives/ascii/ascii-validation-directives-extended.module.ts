import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { AsciiCompleteTemplateDrivenValidationDirectivesComponent } from './complete/ascii-complete.component';
import { AsciiConditionalExpressionTemplateDrivenValidationDirectivesComponent } from './conditionalExpression/ascii-conditional-expression.component';
import { AsciiMessageTemplateDrivenValidationDirectivesComponent } from './message/ascii-message.component';
import { AsciiAddTemplateDrivenValidationDirectivesComponent } from './add/ascii-add.component';

@NgModule({
  declarations: [
	AsciiCompleteTemplateDrivenValidationDirectivesComponent,
	AsciiConditionalExpressionTemplateDrivenValidationDirectivesComponent,
	AsciiMessageTemplateDrivenValidationDirectivesComponent,
	AsciiAddTemplateDrivenValidationDirectivesComponent,
  ],
entryComponents: [
	AsciiCompleteTemplateDrivenValidationDirectivesComponent,
	AsciiConditionalExpressionTemplateDrivenValidationDirectivesComponent,
	AsciiMessageTemplateDrivenValidationDirectivesComponent,
	AsciiAddTemplateDrivenValidationDirectivesComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	AsciiCompleteTemplateDrivenValidationDirectivesComponent,
	AsciiConditionalExpressionTemplateDrivenValidationDirectivesComponent,
	AsciiMessageTemplateDrivenValidationDirectivesComponent,
	AsciiAddTemplateDrivenValidationDirectivesComponent,
  ],

})
export class  AsciiTemplateDrivenValidationDirectivesExtendedModule { }
