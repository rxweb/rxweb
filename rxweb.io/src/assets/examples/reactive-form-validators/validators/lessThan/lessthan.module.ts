import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { LessThanCompleteValidatorComponent } from './complete/less-than-complete.component';
import { LessThanFieldNameValidatorComponent } from './fieldName/less-than-field-name.component';
import { LessThanConditionalExpressionValidatorComponent } from './conditionalExpression/less-than-conditional-expression.component';
import { LessThanMessageValidatorComponent } from './message/less-than-message.component';
import { LessThanDynamicValidatorComponent } from './dynamic/less-than-dynamic.component';
import { LessThanAddValidatorComponent } from './add/less-than-add.component';

@NgModule({
  declarations: [
	LessThanCompleteValidatorComponent,
	LessThanFieldNameValidatorComponent,
	LessThanConditionalExpressionValidatorComponent,
	LessThanMessageValidatorComponent,
	LessThanDynamicValidatorComponent,
	LessThanAddValidatorComponent,
  ],
entryComponents: [
	LessThanCompleteValidatorComponent,
	LessThanFieldNameValidatorComponent,
	LessThanConditionalExpressionValidatorComponent,
	LessThanMessageValidatorComponent,
	LessThanDynamicValidatorComponent,
	LessThanAddValidatorComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	LessThanCompleteValidatorComponent,
	LessThanFieldNameValidatorComponent,
	LessThanConditionalExpressionValidatorComponent,
	LessThanMessageValidatorComponent,
	LessThanDynamicValidatorComponent,
	LessThanAddValidatorComponent,
  ],

})
export class  LessThanExtendedModule { }
