import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { ReactiveFormBasedValidationComponent } from "src/assets/examples/reactive-form-validators/basic-examples/reactive-form-based-validation/reactive-form-based-validation.component";
import { TemplateFormBasedValidationComponent } from "src/assets/examples/reactive-form-validators/basic-examples/template-form-based-validation/template-form-based-validation.component";
import { ModelBasedFromValidationComponent } from "src/assets/examples/reactive-form-validators/basic-examples/model-based-from-validation/model-based-from-validation.component";


@NgModule({
  declarations: [
	ReactiveFormBasedValidationComponent,TemplateFormBasedValidationComponent,ModelBasedFromValidationComponent
  ],
entryComponents: [
	ReactiveFormBasedValidationComponent,TemplateFormBasedValidationComponent,ModelBasedFromValidationComponent
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	ReactiveFormBasedValidationComponent,TemplateFormBasedValidationComponent,ModelBasedFromValidationComponent
  ],

})
export class  BasicExamplesExtendedModule { }
