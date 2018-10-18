import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { DataUriCompleteComponent } from './complete/data-uri-complete.component';
import { DataUriConditionalExpressionComponent } from './conditionalExpression/data-uri-conditional-expression.component';
import { DataUriMessageComponent } from './message/data-uri-message.component';
import { DataUriDynamicComponent } from './dynamic/data-uri-dynamic.component';
import { DataUriAddComponent } from './add/data-uri-add.component';
import { DataUriEditComponent } from './edit/data-uri-edit.component';

@NgModule({
  declarations: [
	DataUriCompleteComponent,
	DataUriConditionalExpressionComponent,
	DataUriMessageComponent,
	DataUriDynamicComponent,
	DataUriAddComponent,
	DataUriEditComponent,
  ],
entryComponents: [
	DataUriCompleteComponent,
	DataUriConditionalExpressionComponent,
	DataUriMessageComponent,
	DataUriDynamicComponent,
	DataUriAddComponent,
	DataUriEditComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	DataUriCompleteComponent,
	DataUriConditionalExpressionComponent,
	DataUriMessageComponent,
	DataUriDynamicComponent,
	DataUriAddComponent,
	DataUriEditComponent,
  ],

})
export class  DataUriExtendedModule { }
