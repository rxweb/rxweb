import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { PasswordCompleteComponent } from './complete/password-complete.component';
import { PasswordValidationComponent } from './validation/password-validation.component';
import { PasswordMessageComponent } from './message/password-message.component';
import { PasswordAddComponent } from './add/password-add.component';
import { PasswordEditComponent } from './edit/password-edit.component';

@NgModule({
  declarations: [
	PasswordCompleteComponent,
	PasswordValidationComponent,
	PasswordMessageComponent,
	PasswordAddComponent,
	PasswordEditComponent,
  ],
entryComponents: [
	PasswordCompleteComponent,
	PasswordValidationComponent,
	PasswordMessageComponent,
	PasswordAddComponent,
	PasswordEditComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	PasswordCompleteComponent,
	PasswordValidationComponent,
	PasswordMessageComponent,
	PasswordAddComponent,
	PasswordEditComponent,
  ],

})
export class  PasswordExtendedModule { }
