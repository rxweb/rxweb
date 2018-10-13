import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { RequiredCompleteValidatorComponent } from './complete/required-complete.component';
import { RequiredConditionalExpressionValidatorComponent } from './conditionalExpression/required-conditional-expression.component';
import { RequiredMessageValidatorComponent } from './message/required-message.component';
import { RequiredDynamicValidatorComponent } from './dynamic/required-dynamic.component';
import { RequiredAddValidatorComponent } from './add/required-add.component';

@NgModule({
  declarations: [
	RequiredCompleteValidatorComponent,
	RequiredConditionalExpressionValidatorComponent,
	RequiredMessageValidatorComponent,
	RequiredDynamicValidatorComponent,
	RequiredAddValidatorComponent,
  ],
entryComponents: [
	RequiredCompleteValidatorComponent,
	RequiredConditionalExpressionValidatorComponent,
	RequiredMessageValidatorComponent,
	RequiredDynamicValidatorComponent,
	RequiredAddValidatorComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	RequiredCompleteValidatorComponent,
	RequiredConditionalExpressionValidatorComponent,
	RequiredMessageValidatorComponent,
	RequiredDynamicValidatorComponent,
	RequiredAddValidatorComponent,
  ],

})
export class  RequiredExtendedModule { }
