import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { DateCompleteValidatorComponent } from './complete/date-complete.component';
import { DateConditionalExpressionValidatorComponent } from './conditionalExpression/date-conditional-expression.component';
import { DateMessageValidatorComponent } from './message/date-message.component';
import { DateDynamicValidatorComponent } from './dynamic/date-dynamic.component';
import { DateAddValidatorComponent } from './add/date-add.component';

@NgModule({
  declarations: [
	DateCompleteValidatorComponent,
	DateConditionalExpressionValidatorComponent,
	DateMessageValidatorComponent,
	DateDynamicValidatorComponent,
	DateAddValidatorComponent,
  ],
entryComponents: [
	DateCompleteValidatorComponent,
	DateConditionalExpressionValidatorComponent,
	DateMessageValidatorComponent,
	DateDynamicValidatorComponent,
	DateAddValidatorComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	DateCompleteValidatorComponent,
	DateConditionalExpressionValidatorComponent,
	DateMessageValidatorComponent,
	DateDynamicValidatorComponent,
	DateAddValidatorComponent,
  ],

})
export class  DateValidatorsExtendedModule { }
