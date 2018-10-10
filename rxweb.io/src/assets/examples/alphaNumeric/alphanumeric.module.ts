import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { AlphaNumericCompleteComponent } from './complete/alpha-numeric-complete.component';
import { AlphaNumericAllowWhiteSpaceComponent } from './allowWhiteSpace/alpha-numeric-allow-white-space.component';
import { AlphaNumericMessageComponent } from './message/alpha-numeric-message.component';
import { AlphaNumericConditionalExpressionComponent } from './conditionalExpression/alpha-numeric-conditional-expression.component';
import { AlphaNumericAddComponent } from './add/alpha-numeric-add.component';
import { AlphaNumericEditComponent } from './edit/alpha-numeric-edit.component';

@NgModule({
  declarations: [
	AlphaNumericCompleteComponent,
	AlphaNumericAllowWhiteSpaceComponent,
	AlphaNumericMessageComponent,
	AlphaNumericConditionalExpressionComponent,
	AlphaNumericAddComponent,
	AlphaNumericEditComponent,
  ],
entryComponents: [
	AlphaNumericCompleteComponent,
	AlphaNumericAllowWhiteSpaceComponent,
	AlphaNumericMessageComponent,
	AlphaNumericConditionalExpressionComponent,
	AlphaNumericAddComponent,
	AlphaNumericEditComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	AlphaNumericCompleteComponent,
	AlphaNumericAllowWhiteSpaceComponent,
	AlphaNumericMessageComponent,
	AlphaNumericConditionalExpressionComponent,
	AlphaNumericAddComponent,
	AlphaNumericEditComponent,
  ],

})
export class  AlphaNumericExtendedModule { }
