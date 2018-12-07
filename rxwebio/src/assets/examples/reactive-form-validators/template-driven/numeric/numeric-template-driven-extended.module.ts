import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { NumericCompleteTemplateDrivenComponent } from './complete/numeric-complete.component';
import { NumericAcceptValueTemplateDrivenComponent } from './acceptValue/numeric-accept-value.component';
import { NumericAllowDecimalTemplateDrivenComponent } from './allowDecimal/numeric-allow-decimal.component';
import { NumericConditionalExpressionTemplateDrivenComponent } from './conditionalExpression/numeric-conditional-expression.component';
import { NumericMessageTemplateDrivenComponent } from './message/numeric-message.component';
import { NumericAddTemplateDrivenComponent } from './add/numeric-add.component';

@NgModule({
  declarations: [
	NumericCompleteTemplateDrivenComponent,
	NumericAcceptValueTemplateDrivenComponent,
	NumericAllowDecimalTemplateDrivenComponent,
	NumericConditionalExpressionTemplateDrivenComponent,
	NumericMessageTemplateDrivenComponent,
	NumericAddTemplateDrivenComponent,
  ],
entryComponents: [
	NumericCompleteTemplateDrivenComponent,
	NumericAcceptValueTemplateDrivenComponent,
	NumericAllowDecimalTemplateDrivenComponent,
	NumericConditionalExpressionTemplateDrivenComponent,
	NumericMessageTemplateDrivenComponent,
	NumericAddTemplateDrivenComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	NumericCompleteTemplateDrivenComponent,
	NumericAcceptValueTemplateDrivenComponent,
	NumericAllowDecimalTemplateDrivenComponent,
	NumericConditionalExpressionTemplateDrivenComponent,
	NumericMessageTemplateDrivenComponent,
	NumericAddTemplateDrivenComponent,
  ],

})
export class  NumericTemplateDrivenExtendedModule { }
