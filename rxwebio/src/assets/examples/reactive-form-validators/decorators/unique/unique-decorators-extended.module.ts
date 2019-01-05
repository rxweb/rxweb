import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { UniqueCompleteComponent } from './complete/unique-complete.component';
import { UniqueAdditionalValidationComponent } from './additionalValidation/unique-additional-validation.component';
import { UniqueMessageComponent } from './message/unique-message.component';
import { UniqueAddComponent } from './add/unique-add.component';


@NgModule({
  declarations: [
	UniqueCompleteComponent,
	UniqueAdditionalValidationComponent,
	UniqueMessageComponent,
	UniqueAddComponent,
  ],
entryComponents: [
	UniqueCompleteComponent,
	UniqueAdditionalValidationComponent,
	UniqueMessageComponent,
	UniqueAddComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	UniqueCompleteComponent,
	UniqueAdditionalValidationComponent,
	UniqueMessageComponent,
	UniqueAddComponent,
  ],

})
export class  UniqueDecoratorsExtendedModule { }
