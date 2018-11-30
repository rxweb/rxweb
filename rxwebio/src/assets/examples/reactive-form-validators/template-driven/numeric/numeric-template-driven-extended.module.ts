import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { NumericCompleteTemplateDrivenComponent } from './complete/numeric-complete.component';
import { NumericAcceptValueTemplateDrivenComponent } from './acceptValue/numeric-accept-value.component';
import { NumericMessageTemplateDrivenComponent } from './message/numeric-message.component';
import { NumericAllowDecimalTemplateDrivenComponent } from './allowDecimal/numeric-allow-decimal.component';
import { NumericConditionalExpressionTemplateDrivenComponent } from './conditionalExpression/numeric-conditional-expression.component';
import { NumericAddTemplateDrivenComponent } from './add/numeric-add.component';

@NgModule({
  declarations: [
	NumericCompleteTemplateDrivenComponent,
	NumericAcceptValueTemplateDrivenComponent,
	NumericMessageTemplateDrivenComponent,
	NumericAllowDecimalTemplateDrivenComponent,
	NumericConditionalExpressionTemplateDrivenComponent,
	NumericAddTemplateDrivenComponent,
  ],
entryComponents: [
	NumericCompleteTemplateDrivenComponent,
	NumericAcceptValueTemplateDrivenComponent,
	NumericMessageTemplateDrivenComponent,
	NumericAllowDecimalTemplateDrivenComponent,
	NumericConditionalExpressionTemplateDrivenComponent,
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
	NumericMessageTemplateDrivenComponent,
	NumericAllowDecimalTemplateDrivenComponent,
	NumericConditionalExpressionTemplateDrivenComponent,
	NumericAddTemplateDrivenComponent,
  ],

})
export class  NumericTemplateDrivenExtendedModule { }
