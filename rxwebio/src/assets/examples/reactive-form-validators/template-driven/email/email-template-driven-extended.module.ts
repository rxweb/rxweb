import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { EmailCompleteTemplateDrivenComponent } from './complete/email-complete.component';
import { EmailConditionalExpressionTemplateDrivenComponent } from './conditionalExpression/email-conditional-expression.component';
import { EmailMessageTemplateDrivenComponent } from './message/email-message.component';
import { EmailAddTemplateDrivenComponent } from './add/email-add.component';

@NgModule({
  declarations: [
	EmailCompleteTemplateDrivenComponent,
	EmailConditionalExpressionTemplateDrivenComponent,
	EmailMessageTemplateDrivenComponent,
	EmailAddTemplateDrivenComponent,
  ],
entryComponents: [
	EmailCompleteTemplateDrivenComponent,
	EmailConditionalExpressionTemplateDrivenComponent,
	EmailMessageTemplateDrivenComponent,
	EmailAddTemplateDrivenComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	EmailCompleteTemplateDrivenComponent,
	EmailConditionalExpressionTemplateDrivenComponent,
	EmailMessageTemplateDrivenComponent,
	EmailAddTemplateDrivenComponent,
  ],

})
export class  EmailTemplateDrivenExtendedModule { }
