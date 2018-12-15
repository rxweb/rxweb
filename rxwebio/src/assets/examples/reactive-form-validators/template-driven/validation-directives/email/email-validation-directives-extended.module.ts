import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { EmailCompleteTemplateDrivenValidationDirectivesComponent } from './complete/email-complete.component';
import { EmailConditionalExpressionTemplateDrivenValidationDirectivesComponent } from './conditionalExpression/email-conditional-expression.component';
import { EmailMessageTemplateDrivenValidationDirectivesComponent } from './message/email-message.component';
import { EmailAddTemplateDrivenValidationDirectivesComponent } from './add/email-add.component';

@NgModule({
  declarations: [
	EmailCompleteTemplateDrivenValidationDirectivesComponent,
	EmailConditionalExpressionTemplateDrivenValidationDirectivesComponent,
	EmailMessageTemplateDrivenValidationDirectivesComponent,
	EmailAddTemplateDrivenValidationDirectivesComponent,
  ],
entryComponents: [
	EmailCompleteTemplateDrivenValidationDirectivesComponent,
	EmailConditionalExpressionTemplateDrivenValidationDirectivesComponent,
	EmailMessageTemplateDrivenValidationDirectivesComponent,
	EmailAddTemplateDrivenValidationDirectivesComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	EmailCompleteTemplateDrivenValidationDirectivesComponent,
	EmailConditionalExpressionTemplateDrivenValidationDirectivesComponent,
	EmailMessageTemplateDrivenValidationDirectivesComponent,
	EmailAddTemplateDrivenValidationDirectivesComponent,
  ],

})
export class  EmailTemplateDrivenValidationDirectivesExtendedModule { }
