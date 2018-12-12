import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { PasswordCompleteTemplateDrivenValidationDecoratorsComponent } from './complete/password-complete.component';
import { PasswordValidationTemplateDrivenValidationDecoratorsComponent } from './validation/password-validation.component';
import { PasswordMessageTemplateDrivenValidationDecoratorsComponent } from './message/password-message.component';
import { PasswordAddTemplateDrivenValidationDecoratorsComponent } from './add/password-add.component';

@NgModule({
  declarations: [
	PasswordCompleteTemplateDrivenValidationDecoratorsComponent,
	PasswordValidationTemplateDrivenValidationDecoratorsComponent,
	PasswordMessageTemplateDrivenValidationDecoratorsComponent,
	PasswordAddTemplateDrivenValidationDecoratorsComponent,
  ],
entryComponents: [
	PasswordCompleteTemplateDrivenValidationDecoratorsComponent,
	PasswordValidationTemplateDrivenValidationDecoratorsComponent,
	PasswordMessageTemplateDrivenValidationDecoratorsComponent,
	PasswordAddTemplateDrivenValidationDecoratorsComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	PasswordCompleteTemplateDrivenValidationDecoratorsComponent,
	PasswordValidationTemplateDrivenValidationDecoratorsComponent,
	PasswordMessageTemplateDrivenValidationDecoratorsComponent,
	PasswordAddTemplateDrivenValidationDecoratorsComponent,
  ],

})
export class  PasswordTemplateDrivenValidationDecoratorsExtendedModule { }
