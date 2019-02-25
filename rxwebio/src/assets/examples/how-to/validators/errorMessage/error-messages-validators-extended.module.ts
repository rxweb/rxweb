import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { ErrormessageSingleComponent } from './complete/errorMessage-component';
import { ErrormessageSingleValidatorComponent } from './single-message/errormessage-single.component';





@NgModule({
  declarations: [
    ErrormessageSingleValidatorComponent,ErrormessageSingleComponent
  ],
entryComponents: [
	ErrormessageSingleValidatorComponent,ErrormessageSingleComponent
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	ErrormessageSingleValidatorComponent,ErrormessageSingleComponent
  ],

})
export class  ErrorMessagesValidatorsExtendedModule { }