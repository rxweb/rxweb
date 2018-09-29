import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { LessThanCompleteComponent } from './complete/less-than-complete.component';
import { LessThanFieldNameComponent } from './fieldName/less-than-field-name.component';
import { LessThanConditionalExpressionsComponent } from './conditionalExpressions/less-than-conditional-expressions.component';
import { LessThanMessageComponent } from './message/less-than-message.component';
import { LessThanAddComponent } from './add/less-than-add.component';
import { LessThanEditComponent } from './edit/less-than-edit.component';

@NgModule({
  declarations: [
	LessThanCompleteComponent,
	LessThanFieldNameComponent,
	LessThanConditionalExpressionsComponent,
	LessThanMessageComponent,
	LessThanAddComponent,
	LessThanEditComponent,
  ],
entryComponents: [
	LessThanCompleteComponent,
	LessThanFieldNameComponent,
	LessThanConditionalExpressionsComponent,
	LessThanMessageComponent,
	LessThanAddComponent,
	LessThanEditComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	LessThanCompleteComponent,
	LessThanFieldNameComponent,
	LessThanConditionalExpressionsComponent,
	LessThanMessageComponent,
	LessThanAddComponent,
	LessThanEditComponent,
  ],

})
export class  LessThanExtendedModule { }
