import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { DifferentCompleteValidatorComponent } from './complete/different-complete.component';
import { DifferentFieldNameValidatorComponent } from './fieldName/different-field-name.component';
import { DifferentMessageValidatorComponent } from './message/different-message.component';
import { DifferentDynamicValidatorComponent } from './dynamic/different-dynamic.component';
import { DifferentAddValidatorComponent } from './add/different-add.component';

@NgModule({
  declarations: [
	DifferentCompleteValidatorComponent,
	DifferentFieldNameValidatorComponent,
	DifferentMessageValidatorComponent,
	DifferentDynamicValidatorComponent,
	DifferentAddValidatorComponent,
  ],
entryComponents: [
	DifferentCompleteValidatorComponent,
	DifferentFieldNameValidatorComponent,
	DifferentMessageValidatorComponent,
	DifferentDynamicValidatorComponent,
	DifferentAddValidatorComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	DifferentCompleteValidatorComponent,
	DifferentFieldNameValidatorComponent,
	DifferentMessageValidatorComponent,
	DifferentDynamicValidatorComponent,
	DifferentAddValidatorComponent,
  ],

})
export class  DifferentValidatorsExtendedModule { }
