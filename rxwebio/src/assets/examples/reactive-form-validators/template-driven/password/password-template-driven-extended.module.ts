import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { PasswordCompleteTemplateDrivenComponent } from './complete/password-complete.component';
import { PasswordValidationTemplateDrivenComponent } from './validation/password-validation.component';
import { PasswordMessageTemplateDrivenComponent } from './message/password-message.component';
import { PasswordAddTemplateDrivenComponent } from './add/password-add.component';

@NgModule({
  declarations: [
	PasswordCompleteTemplateDrivenComponent,
	PasswordValidationTemplateDrivenComponent,
	PasswordMessageTemplateDrivenComponent,
	PasswordAddTemplateDrivenComponent,
  ],
entryComponents: [
	PasswordCompleteTemplateDrivenComponent,
	PasswordValidationTemplateDrivenComponent,
	PasswordMessageTemplateDrivenComponent,
	PasswordAddTemplateDrivenComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	PasswordCompleteTemplateDrivenComponent,
	PasswordValidationTemplateDrivenComponent,
	PasswordMessageTemplateDrivenComponent,
	PasswordAddTemplateDrivenComponent,
  ],

})
export class  PasswordTemplateDrivenExtendedModule { }
