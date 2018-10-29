import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { LatLongCompleteValidatorComponent } from './complete/lat-long-complete.component';
import { LatLongConditionalExpressionValidatorComponent } from './conditionalExpression/lat-long-conditional-expression.component';
import { LatLongMessageValidatorComponent } from './message/lat-long-message.component';
import { LatLongDynamicValidatorComponent } from './dynamic/lat-long-dynamic.component';
import { LatLongAddValidatorComponent } from './add/lat-long-add.component';

@NgModule({
  declarations: [
	LatLongCompleteValidatorComponent,
	LatLongConditionalExpressionValidatorComponent,
	LatLongMessageValidatorComponent,
	LatLongDynamicValidatorComponent,
	LatLongAddValidatorComponent,
  ],
entryComponents: [
	LatLongCompleteValidatorComponent,
	LatLongConditionalExpressionValidatorComponent,
	LatLongMessageValidatorComponent,
	LatLongDynamicValidatorComponent,
	LatLongAddValidatorComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	LatLongCompleteValidatorComponent,
	LatLongConditionalExpressionValidatorComponent,
	LatLongMessageValidatorComponent,
	LatLongDynamicValidatorComponent,
	LatLongAddValidatorComponent,
  ],

})
export class  LatLongValidatorsExtendedModule { }
