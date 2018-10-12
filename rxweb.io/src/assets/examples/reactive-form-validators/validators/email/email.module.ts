import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { EmailCompleteValidatorComponent } from './complete/email-complete.component';
import { EmailConditionalExpressionValidatorComponent } from './conditionalExpression/email-conditional-expression.component';
import { EmailMessageValidatorComponent } from './message/email-message.component';
import { EmailDynamicValidatorComponent } from './dynamic/email-dynamic.component';
import { EmailAddValidatorComponent } from './add/email-add.component';

@NgModule({
  declarations: [
	EmailCompleteValidatorComponent,
	EmailConditionalExpressionValidatorComponent,
	EmailMessageValidatorComponent,
	EmailDynamicValidatorComponent,
	EmailAddValidatorComponent,
  ],
entryComponents: [
	EmailCompleteValidatorComponent,
	EmailConditionalExpressionValidatorComponent,
	EmailMessageValidatorComponent,
	EmailDynamicValidatorComponent,
	EmailAddValidatorComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	EmailCompleteValidatorComponent,
	EmailConditionalExpressionValidatorComponent,
	EmailMessageValidatorComponent,
	EmailDynamicValidatorComponent,
	EmailAddValidatorComponent,
  ],

})
export class  EmailExtendedModule { }
