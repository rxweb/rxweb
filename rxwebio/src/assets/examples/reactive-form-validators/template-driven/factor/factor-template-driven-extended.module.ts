import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { FactorCompleteTemplateDrivenComponent } from './complete/factor-complete.component';
import { FactorFieldNameTemplateDrivenComponent } from './fieldName/factor-field-name.component';
import { FactorConditionalExpressionTemplateDrivenComponent } from './conditionalExpression/factor-conditional-expression.component';
import { FactorDividendTemplateDrivenComponent } from './dividend/factor-dividend.component';
import { FactorMessageTemplateDrivenComponent } from './message/factor-message.component';
import { FactorAddTemplateDrivenComponent } from './add/factor-add.component';

@NgModule({
  declarations: [
	FactorCompleteTemplateDrivenComponent,
	FactorFieldNameTemplateDrivenComponent,
	FactorConditionalExpressionTemplateDrivenComponent,
	FactorDividendTemplateDrivenComponent,
	FactorMessageTemplateDrivenComponent,
	FactorAddTemplateDrivenComponent,
  ],
entryComponents: [
	FactorCompleteTemplateDrivenComponent,
	FactorFieldNameTemplateDrivenComponent,
	FactorConditionalExpressionTemplateDrivenComponent,
	FactorDividendTemplateDrivenComponent,
	FactorMessageTemplateDrivenComponent,
	FactorAddTemplateDrivenComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	FactorCompleteTemplateDrivenComponent,
	FactorFieldNameTemplateDrivenComponent,
	FactorConditionalExpressionTemplateDrivenComponent,
	FactorDividendTemplateDrivenComponent,
	FactorMessageTemplateDrivenComponent,
	FactorAddTemplateDrivenComponent,
  ],

})
export class  FactorTemplateDrivenExtendedModule { }
