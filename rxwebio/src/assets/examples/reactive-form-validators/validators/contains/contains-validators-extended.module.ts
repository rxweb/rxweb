import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { ContainsCompleteValidatorComponent } from './complete/contains-complete.component';
import { ContainsValueValidatorComponent } from './value/contains-value.component';
import { ContainsConditionalExpressionValidatorComponent } from './conditionalExpression/contains-conditional-expression.component';
import { ContainsMessageValidatorComponent } from './message/contains-message.component';
import { ContainsDynamicValidatorComponent } from './dynamic/contains-dynamic.component';
import { ContainsAddValidatorComponent } from './add/contains-add.component';

@NgModule({
  declarations: [
	ContainsCompleteValidatorComponent,
	ContainsValueValidatorComponent,
	ContainsConditionalExpressionValidatorComponent,
	ContainsMessageValidatorComponent,
	ContainsDynamicValidatorComponent,
	ContainsAddValidatorComponent,
  ],
entryComponents: [
	ContainsCompleteValidatorComponent,
	ContainsValueValidatorComponent,
	ContainsConditionalExpressionValidatorComponent,
	ContainsMessageValidatorComponent,
	ContainsDynamicValidatorComponent,
	ContainsAddValidatorComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	ContainsCompleteValidatorComponent,
	ContainsValueValidatorComponent,
	ContainsConditionalExpressionValidatorComponent,
	ContainsMessageValidatorComponent,
	ContainsDynamicValidatorComponent,
	ContainsAddValidatorComponent,
  ],

})
export class  ContainsValidatorsExtendedModule { }
