import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { ToBooleanCompleteComponent } from './complete/to-boolean-complete.component';
import { ToBooleanStrictComponent } from './strict/to-boolean-strict.component';

@NgModule({
  declarations: [
	ToBooleanCompleteComponent,
	ToBooleanStrictComponent,
  ],
entryComponents: [
	ToBooleanCompleteComponent,
	ToBooleanStrictComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	ToBooleanCompleteComponent,
	ToBooleanStrictComponent,
  ],

})
export class  ToBooleanDecoratorsExtendedModule { }
