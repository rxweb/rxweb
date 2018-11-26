import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { CompareCompleteTemplateDrivenComponent } from './complete/compare-complete.component';
import { CompareFieldNameTemplateDrivenComponent } from './fieldName/compare-field-name.component';
import { CompareMessageTemplateDrivenComponent } from './message/compare-message.component';
import { CompareAddTemplateDrivenComponent } from './add/compare-add.component';

@NgModule({
  declarations: [
	CompareCompleteTemplateDrivenComponent,
	CompareFieldNameTemplateDrivenComponent,
	CompareMessageTemplateDrivenComponent,
	CompareAddTemplateDrivenComponent,
  ],
entryComponents: [
	CompareCompleteTemplateDrivenComponent,
	CompareFieldNameTemplateDrivenComponent,
	CompareMessageTemplateDrivenComponent,
	CompareAddTemplateDrivenComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	CompareCompleteTemplateDrivenComponent,
	CompareFieldNameTemplateDrivenComponent,
	CompareMessageTemplateDrivenComponent,
	CompareAddTemplateDrivenComponent,
  ],

})
export class  CompareTemplateDrivenExtendedModule { }
