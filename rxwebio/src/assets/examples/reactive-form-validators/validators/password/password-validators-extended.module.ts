import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { PasswordCompleteValidatorComponent } from './complete/password-complete.component';
import { PasswordValidationValidatorComponent } from './validation/password-validation.component';
import { PasswordMessageValidatorComponent } from './message/password-message.component';
import { PasswordDynamicValidatorComponent } from './dynamic/password-dynamic.component';
import { PasswordAddValidatorComponent } from './add/password-add.component';

@NgModule({
  declarations: [
	PasswordCompleteValidatorComponent,
	PasswordValidationValidatorComponent,
	PasswordMessageValidatorComponent,
	PasswordDynamicValidatorComponent,
	PasswordAddValidatorComponent,
  ],
entryComponents: [
	PasswordCompleteValidatorComponent,
	PasswordValidationValidatorComponent,
	PasswordMessageValidatorComponent,
	PasswordDynamicValidatorComponent,
	PasswordAddValidatorComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	PasswordCompleteValidatorComponent,
	PasswordValidationValidatorComponent,
	PasswordMessageValidatorComponent,
	PasswordDynamicValidatorComponent,
	PasswordAddValidatorComponent,
  ],

})
export class  PasswordValidatorsExtendedModule { }
