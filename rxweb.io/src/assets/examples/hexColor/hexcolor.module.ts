import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { HexColorCompleteComponent } from './complete/hex-color-complete.component';
import { HexColorConditionalExpressionsComponent } from './conditionalExpressions/hex-color-conditional-expressions.component';
import { HexColorMessageComponent } from './message/hex-color-message.component';
import { HexColorAddComponent } from './add/hex-color-add.component';
import { HexColorEditComponent } from './edit/hex-color-edit.component';

@NgModule({
  declarations: [
	HexColorCompleteComponent,
	HexColorConditionalExpressionsComponent,
	HexColorMessageComponent,
	HexColorAddComponent,
	HexColorEditComponent,
  ],
entryComponents: [
	HexColorCompleteComponent,
	HexColorConditionalExpressionsComponent,
	HexColorMessageComponent,
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
	HexColorConditionalExpressionsComponent,
	HexColorMessageComponent,
	HexColorAddComponent,
	HexColorEditComponent,
  ],

})
export class  HexColorExtendedModule { }
