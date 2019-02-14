import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { ErrorMessagesComponent } from './errorMessage/complete/errorMessage-component';
import { SingleErrorMessagesComponent } from './errorMessage/single-message/single-errorMessage-component';
import { FormDataComponent } from './formData/formData/form-data.component';



@NgModule({
  declarations: [
    ErrorMessagesComponent,SingleErrorMessagesComponent,FormDataComponent
  ],
entryComponents: [
    ErrorMessagesComponent,SingleErrorMessagesComponent,FormDataComponent
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
     exports: [
    ErrorMessagesComponent,SingleErrorMessagesComponent,FormDataComponent
  ],

})
export class ErrorMessagesComponentExtendedModule { }
