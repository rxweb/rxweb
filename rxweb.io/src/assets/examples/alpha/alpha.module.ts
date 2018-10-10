import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { AlphaCompleteComponent } from './complete/alpha-complete.component';
import { AlphaConditionalExpressionComponent } from './conditionalExpression/alpha-conditional-expression.component';
import { AlphaAllowWhiteSpaceComponent } from './allowWhiteSpace/alpha-allow-white-space.component';
import { AlphaMessageComponent } from './message/alpha-message.component';
import { AlphaAddComponent } from './add/alpha-add.component';
import { AlphaEditComponent } from './edit/alpha-edit.component';

@NgModule({
  declarations: [
	AlphaCompleteComponent,
	AlphaConditionalExpressionComponent,
	AlphaAllowWhiteSpaceComponent,
	AlphaMessageComponent,
	AlphaAddComponent,
	AlphaEditComponent,
  ],
entryComponents: [
	AlphaCompleteComponent,
	AlphaConditionalExpressionComponent,
	AlphaAllowWhiteSpaceComponent,
	AlphaMessageComponent,
	AlphaAddComponent,
	AlphaEditComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	AlphaCompleteComponent,
	AlphaConditionalExpressionComponent,
	AlphaAllowWhiteSpaceComponent,
	AlphaMessageComponent,
	AlphaAddComponent,
	AlphaEditComponent,
  ],

})
export class  AlphaExtendedModule { }
