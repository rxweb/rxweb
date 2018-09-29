import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { LowerCaseCompleteComponent } from './complete/lower-case-complete.component';
import { LowerCaseConditionalExpressionsComponent } from './conditionalExpressions/lower-case-conditional-expressions.component';
import { LowerCaseMessageComponent } from './message/lower-case-message.component';
import { LowerCaseAddComponent } from './add/lower-case-add.component';
import { LowerCaseEditComponent } from './edit/lower-case-edit.component';

@NgModule({
  declarations: [
	LowerCaseCompleteComponent,
	LowerCaseConditionalExpressionsComponent,
	LowerCaseMessageComponent,
	LowerCaseAddComponent,
	LowerCaseEditComponent,
  ],
entryComponents: [
	LowerCaseCompleteComponent,
	LowerCaseConditionalExpressionsComponent,
	LowerCaseMessageComponent,
	LowerCaseAddComponent,
	LowerCaseEditComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	LowerCaseCompleteComponent,
	LowerCaseConditionalExpressionsComponent,
	LowerCaseMessageComponent,
	LowerCaseAddComponent,
	LowerCaseEditComponent,
  ],

})
export class  LowerCaseExtendedModule { }
