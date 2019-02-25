import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { ErrorMessagesComponent } from './complete/errorMessage-component';
import { SingleErrorMessagesComponent } from './single-message/errormessage-single.component';





@NgModule({
  declarations: [
    ErrorMessagesComponent,SingleErrorMessagesComponent
  ],
entryComponents: [
	ErrorMessagesComponent,SingleErrorMessagesComponent
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	ErrorMessagesComponent,SingleErrorMessagesComponent
  ],

})
export class  ErrorMessagesDecoratorsExtendedModule { }