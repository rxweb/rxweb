import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { UniqueAddValidatorComponent } from './add/unique-add.component';
import { UniqueMessageValidatorComponent } from './message/unique-message.component';
import { UniqueCompleteValidatorComponent } from './complete/unique-complete.component';

@NgModule({
  declarations: [
	UniqueCompleteValidatorComponent,
	UniqueMessageValidatorComponent,
	UniqueAddValidatorComponent,
  ],
entryComponents: [
	UniqueCompleteValidatorComponent,
	UniqueMessageValidatorComponent,
	UniqueAddValidatorComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	UniqueCompleteValidatorComponent,
	UniqueMessageValidatorComponent,
	UniqueAddValidatorComponent,
  ],

})
export class  UniqueValidatorsExtendedModule { }
