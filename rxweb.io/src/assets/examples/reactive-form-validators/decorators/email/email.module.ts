import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { EmailCompleteComponent } from './complete/email-complete.component';
import { EmailConditionalExpressionComponent } from './conditionalExpression/email-conditional-expression.component';
import { EmailMessageComponent } from './message/email-message.component';
import { EmailDynamicComponent } from './dynamic/email-dynamic.component';
import { EmailAddComponent } from './add/email-add.component';
import { EmailEditComponent } from './edit/email-edit.component';

@NgModule({
  declarations: [
	EmailCompleteComponent,
	EmailConditionalExpressionComponent,
	EmailMessageComponent,
	EmailDynamicComponent,
	EmailAddComponent,
	EmailEditComponent,
  ],
entryComponents: [
	EmailCompleteComponent,
	EmailConditionalExpressionComponent,
	EmailMessageComponent,
	EmailDynamicComponent,
	EmailAddComponent,
	EmailEditComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	EmailCompleteComponent,
	EmailConditionalExpressionComponent,
	EmailMessageComponent,
	EmailDynamicComponent,
	EmailAddComponent,
	EmailEditComponent,
  ],

})
export class  EmailExtendedModule { }
