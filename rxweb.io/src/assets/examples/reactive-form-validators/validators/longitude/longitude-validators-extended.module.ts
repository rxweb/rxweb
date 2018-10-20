import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { LongitudeCompleteValidatorComponent } from './complete/longitude-complete.component';
import { LongitudeConditionalExpressionValidatorComponent } from './conditionalExpression/longitude-conditional-expression.component';
import { LongitudeMessageValidatorComponent } from './message/longitude-message.component';
import { LongitudeDynamicValidatorComponent } from './dynamic/longitude-dynamic.component';
import { LongitudeAddValidatorComponent } from './add/longitude-add.component';

@NgModule({
  declarations: [
	LongitudeCompleteValidatorComponent,
	LongitudeConditionalExpressionValidatorComponent,
	LongitudeMessageValidatorComponent,
	LongitudeDynamicValidatorComponent,
	LongitudeAddValidatorComponent,
  ],
entryComponents: [
	LongitudeCompleteValidatorComponent,
	LongitudeConditionalExpressionValidatorComponent,
	LongitudeMessageValidatorComponent,
	LongitudeDynamicValidatorComponent,
	LongitudeAddValidatorComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	LongitudeCompleteValidatorComponent,
	LongitudeConditionalExpressionValidatorComponent,
	LongitudeMessageValidatorComponent,
	LongitudeDynamicValidatorComponent,
	LongitudeAddValidatorComponent,
  ],

})
export class  LongitudeValidatorsExtendedModule { }
