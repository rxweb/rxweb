import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { HexColorCompleteValidatorComponent } from './complete/hex-color-complete.component';
import { HexColorConditionalExpressionValidatorComponent } from './conditionalExpression/hex-color-conditional-expression.component';
import { HexColorMessageValidatorComponent } from './message/hex-color-message.component';
import { HexColorDynamicValidatorComponent } from './dynamic/hex-color-dynamic.component';
import { HexColorAddValidatorComponent } from './add/hex-color-add.component';

@NgModule({
  declarations: [
	HexColorCompleteValidatorComponent,
	HexColorConditionalExpressionValidatorComponent,
	HexColorMessageValidatorComponent,
	HexColorDynamicValidatorComponent,
	HexColorAddValidatorComponent,
  ],
entryComponents: [
	HexColorCompleteValidatorComponent,
	HexColorConditionalExpressionValidatorComponent,
	HexColorMessageValidatorComponent,
	HexColorDynamicValidatorComponent,
	HexColorAddValidatorComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	HexColorCompleteValidatorComponent,
	HexColorConditionalExpressionValidatorComponent,
	HexColorMessageValidatorComponent,
	HexColorDynamicValidatorComponent,
	HexColorAddValidatorComponent,
  ],

})
export class  HexColorValidatorsExtendedModule { }
