import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { DifferentCompleteTemplateDrivenValidationDirectivesComponent } from './complete/different-complete.component';
import { DifferentFieldNameTemplateDrivenValidationDirectivesComponent } from './fieldName/different-field-name.component';
import { DifferentMessageTemplateDrivenValidationDirectivesComponent } from './message/different-message.component';
import { DifferentAddTemplateDrivenValidationDirectivesComponent } from './add/different-add.component';

@NgModule({
  declarations: [
	DifferentCompleteTemplateDrivenValidationDirectivesComponent,
	DifferentFieldNameTemplateDrivenValidationDirectivesComponent,
	DifferentMessageTemplateDrivenValidationDirectivesComponent,
	DifferentAddTemplateDrivenValidationDirectivesComponent,
  ],
entryComponents: [
	DifferentCompleteTemplateDrivenValidationDirectivesComponent,
	DifferentFieldNameTemplateDrivenValidationDirectivesComponent,
	DifferentMessageTemplateDrivenValidationDirectivesComponent,
	DifferentAddTemplateDrivenValidationDirectivesComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	DifferentCompleteTemplateDrivenValidationDirectivesComponent,
	DifferentFieldNameTemplateDrivenValidationDirectivesComponent,
	DifferentMessageTemplateDrivenValidationDirectivesComponent,
	DifferentAddTemplateDrivenValidationDirectivesComponent,
  ],

})
export class  DifferentTemplateDrivenValidationDirectivesExtendedModule { }
