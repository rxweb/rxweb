import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { ErrormessageSingleComponent } from './single-message/errormessage-single.component';
import { ErrormessageCompleteComponent } from './complete/errormessage-complete.component';





@NgModule({
  declarations: [
    ErrormessageCompleteComponent,ErrormessageSingleComponent
  ],
entryComponents: [
	ErrormessageCompleteComponent,ErrormessageSingleComponent
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    ErrormessageCompleteComponent,ErrormessageSingleComponent
  ],

})
export class  ErrorMessagesDecoratorsExtendedModule { }