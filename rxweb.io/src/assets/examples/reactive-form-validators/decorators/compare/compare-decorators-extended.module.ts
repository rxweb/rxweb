import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { CompareCompleteComponent } from './complete/compare-complete.component';
import { CompareFieldNameComponent } from './fieldName/compare-field-name.component';
import { CompareMessageComponent } from './message/compare-message.component';
import { CompareDynamicComponent } from './dynamic/compare-dynamic.component';
import { CompareAddComponent } from './add/compare-add.component';
import { CompareEditComponent } from './edit/compare-edit.component';

@NgModule({
  declarations: [
	CompareCompleteComponent,
	CompareFieldNameComponent,
	CompareMessageComponent,
	CompareDynamicComponent,
	CompareAddComponent,
	CompareEditComponent,
  ],
entryComponents: [
	CompareCompleteComponent,
	CompareFieldNameComponent,
	CompareMessageComponent,
	CompareDynamicComponent,
	CompareAddComponent,
	CompareEditComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	CompareCompleteComponent,
	CompareFieldNameComponent,
	CompareMessageComponent,
	CompareDynamicComponent,
	CompareAddComponent,
	CompareEditComponent,
  ],

})
export class  CompareDecoratorsExtendedModule { }
