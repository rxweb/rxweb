import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { DataUriCompleteValidatorComponent } from './complete/data-uri-complete.component';
import { DataUriConditionalExpressionValidatorComponent } from './conditionalExpression/data-uri-conditional-expression.component';
import { DataUriMessageValidatorComponent } from './message/data-uri-message.component';
import { DataUriDynamicValidatorComponent } from './dynamic/data-uri-dynamic.component';
import { DataUriAddValidatorComponent } from './add/data-uri-add.component';

@NgModule({
  declarations: [
	DataUriCompleteValidatorComponent,
	DataUriConditionalExpressionValidatorComponent,
	DataUriMessageValidatorComponent,
	DataUriDynamicValidatorComponent,
	DataUriAddValidatorComponent,
  ],
entryComponents: [
	DataUriCompleteValidatorComponent,
	DataUriConditionalExpressionValidatorComponent,
	DataUriMessageValidatorComponent,
	DataUriDynamicValidatorComponent,
	DataUriAddValidatorComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	DataUriCompleteValidatorComponent,
	DataUriConditionalExpressionValidatorComponent,
	DataUriMessageValidatorComponent,
	DataUriDynamicValidatorComponent,
	DataUriAddValidatorComponent,
  ],

})
export class  DataUriValidatorsExtendedModule { }
