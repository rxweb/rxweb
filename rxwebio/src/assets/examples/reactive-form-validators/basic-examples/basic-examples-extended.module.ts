import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { ReactiveFormBasedValidationComponent } from './reactive-form-based-validation/reactive-form-based-validation.component';
import { TemplateFormBasedValidationComponent } from './template-form-based-validation/template-form-based-validation.component';
import { ModelBasedFormValidationComponent } from './model-based-form-validation/model-based-form-validation.component';


@NgModule({
  declarations: [
	ReactiveFormBasedValidationComponent,TemplateFormBasedValidationComponent,ModelBasedFormValidationComponent
  ],
entryComponents: [
	ReactiveFormBasedValidationComponent,TemplateFormBasedValidationComponent,ModelBasedFormValidationComponent
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	ReactiveFormBasedValidationComponent,TemplateFormBasedValidationComponent,ModelBasedFormValidationComponent
  ],

})
export class  BasicExamplesExtendedModule { }
