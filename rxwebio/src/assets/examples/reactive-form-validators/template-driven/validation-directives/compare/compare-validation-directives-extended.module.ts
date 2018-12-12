import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { CompareCompleteTemplateDrivenValidationDirectivesComponent } from './complete/compare-complete.component';
import { CompareFieldNameTemplateDrivenValidationDirectivesComponent } from './fieldName/compare-field-name.component';
import { CompareMessageTemplateDrivenValidationDirectivesComponent } from './message/compare-message.component';
import { CompareAddTemplateDrivenValidationDirectivesComponent } from './add/compare-add.component';

@NgModule({
  declarations: [
	CompareCompleteTemplateDrivenValidationDirectivesComponent,
	CompareFieldNameTemplateDrivenValidationDirectivesComponent,
	CompareMessageTemplateDrivenValidationDirectivesComponent,
	CompareAddTemplateDrivenValidationDirectivesComponent,
  ],
entryComponents: [
	CompareCompleteTemplateDrivenValidationDirectivesComponent,
	CompareFieldNameTemplateDrivenValidationDirectivesComponent,
	CompareMessageTemplateDrivenValidationDirectivesComponent,
	CompareAddTemplateDrivenValidationDirectivesComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	CompareCompleteTemplateDrivenValidationDirectivesComponent,
	CompareFieldNameTemplateDrivenValidationDirectivesComponent,
	CompareMessageTemplateDrivenValidationDirectivesComponent,
	CompareAddTemplateDrivenValidationDirectivesComponent,
  ],

})
export class  CompareTemplateDrivenValidationDirectivesExtendedModule { }
