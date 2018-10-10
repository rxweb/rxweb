import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { RequiredCompleteComponent } from './complete/required-complete.component';
import { RequiredConditionalExpressionComponent } from './conditionalExpression/required-conditional-expression.component';
import { RequiredMessageComponent } from './message/required-message.component';
import { RequiredAddComponent } from './add/required-add.component';
import { RequiredEditComponent } from './edit/required-edit.component';

@NgModule({
  declarations: [
	RequiredCompleteComponent,
	RequiredConditionalExpressionComponent,
	RequiredMessageComponent,
	RequiredAddComponent,
	RequiredEditComponent,
  ],
entryComponents: [
	RequiredCompleteComponent,
	RequiredConditionalExpressionComponent,
	RequiredMessageComponent,
	RequiredAddComponent,
	RequiredEditComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	RequiredCompleteComponent,
	RequiredConditionalExpressionComponent,
	RequiredMessageComponent,
	RequiredAddComponent,
	RequiredEditComponent,
  ],

})
export class  RequiredExtendedModule { }
