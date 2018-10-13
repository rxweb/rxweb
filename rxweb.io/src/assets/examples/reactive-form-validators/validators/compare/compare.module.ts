import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { CompareCompleteValidatorComponent } from './complete/compare-complete.component';
import { CompareFieldNameValidatorComponent } from './fieldName/compare-field-name.component';
import { CompareMessageValidatorComponent } from './message/compare-message.component';
import { CompareDynamicValidatorComponent } from './dynamic/compare-dynamic.component';
import { CompareAddValidatorComponent } from './add/compare-add.component';

@NgModule({
  declarations: [
	CompareCompleteValidatorComponent,
	CompareFieldNameValidatorComponent,
	CompareMessageValidatorComponent,
	CompareDynamicValidatorComponent,
	CompareAddValidatorComponent,
  ],
entryComponents: [
	CompareCompleteValidatorComponent,
	CompareFieldNameValidatorComponent,
	CompareMessageValidatorComponent,
	CompareDynamicValidatorComponent,
	CompareAddValidatorComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	CompareCompleteValidatorComponent,
	CompareFieldNameValidatorComponent,
	CompareMessageValidatorComponent,
	CompareDynamicValidatorComponent,
	CompareAddValidatorComponent,
  ],

})
export class  CompareExtendedModule { }
