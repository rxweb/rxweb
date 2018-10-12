import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { HexColorCompleteComponent } from './complete/hex-color-complete.component';
import { HexColorConditionalExpressionComponent } from './conditionalExpression/hex-color-conditional-expression.component';
import { HexColorMessageComponent } from './message/hex-color-message.component';
import { HexColorDynamicComponent } from './dynamic/hex-color-dynamic.component';
import { HexColorAddComponent } from './add/hex-color-add.component';
import { HexColorEditComponent } from './edit/hex-color-edit.component';

@NgModule({
  declarations: [
	HexColorCompleteComponent,
	HexColorConditionalExpressionComponent,
	HexColorMessageComponent,
	HexColorDynamicComponent,
	HexColorAddComponent,
	HexColorEditComponent,
  ],
entryComponents: [
	HexColorCompleteComponent,
	HexColorConditionalExpressionComponent,
	HexColorMessageComponent,
	HexColorDynamicComponent,
	HexColorAddComponent,
	HexColorEditComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	HexColorCompleteComponent,
	HexColorConditionalExpressionComponent,
	HexColorMessageComponent,
	HexColorDynamicComponent,
	HexColorAddComponent,
	HexColorEditComponent,
  ],

})
export class  HexColorExtendedModule { }
