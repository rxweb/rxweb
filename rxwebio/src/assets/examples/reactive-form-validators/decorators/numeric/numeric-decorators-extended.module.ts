import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { NumericCompleteComponent } from './complete/numeric-complete.component';
import { NumericAcceptValueComponent } from './acceptValue/numeric-accept-value.component';
import { NumericMessageComponent } from './message/numeric-message.component';
import { NumericAllowDecimalComponent } from './allowDecimal/numeric-allow-decimal.component';
import { NumericConditionalExpressionComponent } from './conditionalExpression/numeric-conditional-expression.component';
import { NumericDynamicComponent } from './dynamic/numeric-dynamic.component';
import { NumericAddComponent } from './add/numeric-add.component';
import { NumericEditComponent } from './edit/numeric-edit.component';

@NgModule({
  declarations: [
	NumericCompleteComponent,
	NumericAcceptValueComponent,
	NumericMessageComponent,
	NumericAllowDecimalComponent,
	NumericConditionalExpressionComponent,
	NumericDynamicComponent,
	NumericAddComponent,
	NumericEditComponent,
  ],
entryComponents: [
	NumericCompleteComponent,
	NumericAcceptValueComponent,
	NumericMessageComponent,
	NumericAllowDecimalComponent,
	NumericConditionalExpressionComponent,
	NumericDynamicComponent,
	NumericAddComponent,
	NumericEditComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	NumericCompleteComponent,
	NumericAcceptValueComponent,
	NumericMessageComponent,
	NumericAllowDecimalComponent,
	NumericConditionalExpressionComponent,
	NumericDynamicComponent,
	NumericAddComponent,
	NumericEditComponent,
  ],

})
export class  NumericDecoratorsExtendedModule { }
