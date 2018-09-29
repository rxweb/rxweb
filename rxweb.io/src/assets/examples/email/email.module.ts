import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { EmailCompleteComponent } from './complete/email-complete.component';
import { EmailConditionalExpressionsComponent } from './conditionalExpressions/email-conditional-expressions.component';
import { EmailMessageComponent } from './message/email-message.component';
import { EmailAddComponent } from './add/email-add.component';
import { EmailEditComponent } from './edit/email-edit.component';

@NgModule({
  declarations: [
	EmailCompleteComponent,
	EmailConditionalExpressionsComponent,
	EmailMessageComponent,
	EmailAddComponent,
	EmailEditComponent,
  ],
entryComponents: [
	EmailCompleteComponent,
	EmailConditionalExpressionsComponent,
	EmailMessageComponent,
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
	EmailConditionalExpressionsComponent,
	EmailMessageComponent,
	EmailAddComponent,
	EmailEditComponent,
  ],

})
export class  EmailExtendedModule { }
