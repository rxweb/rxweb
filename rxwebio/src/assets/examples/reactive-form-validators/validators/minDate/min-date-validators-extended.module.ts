import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { MinDateCompleteValidatorComponent } from './complete/min-date-complete.component';
import { MinDateValueValidatorComponent } from './value/min-date-value.component';
import { MinDateConditionalExpressionValidatorComponent } from './conditionalExpression/min-date-conditional-expression.component';
import { MinDateMessageValidatorComponent } from './message/min-date-message.component';
import { MinDateFieldNameValidatorComponent } from './fieldName/min-date-field-name.component';
import { MinDateOperatorValidatorComponent } from './operator/min-date-operator.component';
import { MinDateDynamicValidatorComponent } from './dynamic/min-date-dynamic.component';
import { MinDateAddValidatorComponent } from './add/min-date-add.component';

@NgModule({
  declarations: [
	MinDateCompleteValidatorComponent,
	MinDateValueValidatorComponent,
	MinDateConditionalExpressionValidatorComponent,
	MinDateMessageValidatorComponent,
	MinDateFieldNameValidatorComponent,
	MinDateOperatorValidatorComponent,
	MinDateDynamicValidatorComponent,
	MinDateAddValidatorComponent,
  ],
entryComponents: [
	MinDateCompleteValidatorComponent,
	MinDateValueValidatorComponent,
	MinDateConditionalExpressionValidatorComponent,
	MinDateMessageValidatorComponent,
	MinDateFieldNameValidatorComponent,
	MinDateOperatorValidatorComponent,
	MinDateDynamicValidatorComponent,
	MinDateAddValidatorComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	MinDateCompleteValidatorComponent,
	MinDateValueValidatorComponent,
	MinDateConditionalExpressionValidatorComponent,
	MinDateMessageValidatorComponent,
	MinDateFieldNameValidatorComponent,
	MinDateOperatorValidatorComponent,
	MinDateDynamicValidatorComponent,
	MinDateAddValidatorComponent,
  ],

})
export class  MinDateValidatorsExtendedModule { }
