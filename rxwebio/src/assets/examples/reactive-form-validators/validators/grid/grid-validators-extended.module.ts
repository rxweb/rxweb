import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { GridCompleteValidatorComponent } from './complete/grid-complete.component';
import { GridConditionalExpressionValidatorComponent } from './conditionalExpression/grid-conditional-expression.component';
import { GridMessageValidatorComponent } from './message/grid-message.component';
import { GridDynamicValidatorComponent } from './dynamic/grid-dynamic.component';
import { GridAddValidatorComponent } from './add/grid-add.component';

@NgModule({ 
  declarations: [
	GridCompleteValidatorComponent,
	GridConditionalExpressionValidatorComponent,
	GridMessageValidatorComponent,
	GridDynamicValidatorComponent,
	GridAddValidatorComponent,
  ],
entryComponents: [
	GridCompleteValidatorComponent,
	GridConditionalExpressionValidatorComponent,
	GridMessageValidatorComponent,
	GridDynamicValidatorComponent,
	GridAddValidatorComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	GridCompleteValidatorComponent,
	GridConditionalExpressionValidatorComponent,
	GridMessageValidatorComponent,
	GridDynamicValidatorComponent,
	GridAddValidatorComponent,
  ],

})
export class  GridValidatorsExtendedModule { }
