import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { PasswordCompleteTemplateDrivenValidationDirectivesComponent } from './complete/password-complete.component';
import { PasswordValidationTemplateDrivenValidationDirectivesComponent } from './validation/password-validation.component';
import { PasswordMessageTemplateDrivenValidationDirectivesComponent } from './message/password-message.component';
import { PasswordAddTemplateDrivenValidationDirectivesComponent } from './add/password-add.component';

@NgModule({
  declarations: [
	PasswordCompleteTemplateDrivenValidationDirectivesComponent,
	PasswordValidationTemplateDrivenValidationDirectivesComponent,
	PasswordMessageTemplateDrivenValidationDirectivesComponent,
	PasswordAddTemplateDrivenValidationDirectivesComponent,
  ],
entryComponents: [
	PasswordCompleteTemplateDrivenValidationDirectivesComponent,
	PasswordValidationTemplateDrivenValidationDirectivesComponent,
	PasswordMessageTemplateDrivenValidationDirectivesComponent,
	PasswordAddTemplateDrivenValidationDirectivesComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	PasswordCompleteTemplateDrivenValidationDirectivesComponent,
	PasswordValidationTemplateDrivenValidationDirectivesComponent,
	PasswordMessageTemplateDrivenValidationDirectivesComponent,
	PasswordAddTemplateDrivenValidationDirectivesComponent,
  ],

})
export class  PasswordTemplateDrivenValidationDirectivesExtendedModule { }
