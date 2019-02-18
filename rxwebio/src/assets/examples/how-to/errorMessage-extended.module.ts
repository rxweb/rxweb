import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';





import { ErrorMessagesComponent } from './errorMessage/decorators/complete/errorMessage-component';


import { ErrormessageSingleComponent } from './errorMessage/validators/complete/errorMessage-component';
import { FormDataValidatorComponent } from './formData/validators/formData/form-data.component';
import { FormDataComponent } from './formData/decorators/form-data.component';
import { DirtyCompleteComponent } from './dirtyCheck/decorators/complete/dirty-complete.component';
import { DirtyCompleteValidatorComponent } from './dirtyCheck/validators/complete/dirty-complete.component';
import { ErrormessageSingleValidatorComponent } from './errorMessage/validators/single-message/errormessage-single.component';
import { SingleErrorMessagesComponent } from './errorMessage/decorators/single-message/errormessage-single.component';
import { FileObjectValidatorComponent } from './fileObject/validators/complete/fileObject-complete.component';
import { FileObjectCompleteComponent } from './fileObject/decorators/complete/fileObject-complete.component';
import { ResetCompleteComponent } from './resetForm/decorators/reset-complete.component';
import { ResetCompleteValidatorComponent } from './resetForm/validators/reset-complete.component';




@NgModule({
  declarations: [
    ErrorMessagesComponent,SingleErrorMessagesComponent,ErrormessageSingleValidatorComponent,ErrormessageSingleComponent,FormDataComponent,FormDataValidatorComponent,FileObjectValidatorComponent,DirtyCompleteValidatorComponent,DirtyCompleteComponent,FileObjectCompleteComponent,ResetCompleteComponent,ResetCompleteValidatorComponent
  ],
entryComponents: [
    ErrorMessagesComponent,SingleErrorMessagesComponent,ErrormessageSingleValidatorComponent,ErrormessageSingleComponent,FormDataComponent,FormDataValidatorComponent,FileObjectValidatorComponent,DirtyCompleteValidatorComponent,DirtyCompleteComponent,FileObjectCompleteComponent,ResetCompleteComponent,ResetCompleteValidatorComponent
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
     exports: [
    ErrorMessagesComponent,SingleErrorMessagesComponent,ErrormessageSingleValidatorComponent,ErrormessageSingleComponent,FormDataValidatorComponent,FormDataComponent,FileObjectValidatorComponent,DirtyCompleteValidatorComponent,DirtyCompleteComponent,FileObjectCompleteComponent,ResetCompleteComponent,ResetCompleteValidatorComponent
  ],

})
export class ErrorMessagesComponentExtendedModule { }
