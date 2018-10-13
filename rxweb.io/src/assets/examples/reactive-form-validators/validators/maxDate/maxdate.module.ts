import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { MaxDateCompleteValidatorComponent } from './complete/max-date-complete.component';
import { MaxDateValueValidatorComponent } from './value/max-date-value.component';
import { MaxDateConditionalExpressionValidatorComponent } from './conditionalExpression/max-date-conditional-expression.component';
import { MaxDateMessageValidatorComponent } from './message/max-date-message.component';
import { MaxDateDynamicValidatorComponent } from './dynamic/max-date-dynamic.component';
import { MaxDateAddValidatorComponent } from './add/max-date-add.component';

@NgModule({
  declarations: [
	MaxDateCompleteValidatorComponent,
	MaxDateValueValidatorComponent,
	MaxDateConditionalExpressionValidatorComponent,
	MaxDateMessageValidatorComponent,
	MaxDateDynamicValidatorComponent,
	MaxDateAddValidatorComponent,
  ],
entryComponents: [
	MaxDateCompleteValidatorComponent,
	MaxDateValueValidatorComponent,
	MaxDateConditionalExpressionValidatorComponent,
	MaxDateMessageValidatorComponent,
	MaxDateDynamicValidatorComponent,
	MaxDateAddValidatorComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	MaxDateCompleteValidatorComponent,
	MaxDateValueValidatorComponent,
	MaxDateConditionalExpressionValidatorComponent,
	MaxDateMessageValidatorComponent,
	MaxDateDynamicValidatorComponent,
	MaxDateAddValidatorComponent,
  ],

})
export class  MaxDateExtendedModule { }
