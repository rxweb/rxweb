import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { UniqueAddValidatorComponent } from './add/unique-add.component';
import { UniqueMessageValidatorComponent } from './message/unique-message.component';
import { UniqueCompleteValidatorComponent } from './complete/unique-complete.component';
import { UniqueAdditionalValidationValidatorComponent } from './additionalValidation/unique-additional-validation.component';

@NgModule({
  declarations: [
	UniqueCompleteValidatorComponent,
	UniqueAdditionalValidationValidatorComponent,
	UniqueMessageValidatorComponent,
	UniqueAddValidatorComponent,
  ],
entryComponents: [
	UniqueCompleteValidatorComponent,
	UniqueAdditionalValidationValidatorComponent,
	UniqueMessageValidatorComponent,
	UniqueAddValidatorComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	UniqueCompleteValidatorComponent,
	UniqueAdditionalValidationValidatorComponent,
	UniqueMessageValidatorComponent,
	UniqueAddValidatorComponent,
  ],

})
export class  UniqueValidatorsExtendedModule { }
