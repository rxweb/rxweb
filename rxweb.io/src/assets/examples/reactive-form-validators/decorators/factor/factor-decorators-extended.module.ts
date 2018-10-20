import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { FactorCompleteComponent } from './complete/factor-complete.component';
import { FactorFieldNameComponent } from './fieldName/factor-field-name.component';
import { FactorConditionalExpressionComponent } from './conditionalExpression/factor-conditional-expression.component';
import { FactorDividendComponent } from './dividend/factor-dividend.component';
import { FactorMessageComponent } from './message/factor-message.component';
import { FactorDynamicComponent } from './dynamic/factor-dynamic.component';
import { FactorAddComponent } from './add/factor-add.component';
import { FactorEditComponent } from './edit/factor-edit.component';

@NgModule({
  declarations: [
	FactorCompleteComponent,
	FactorFieldNameComponent,
	FactorConditionalExpressionComponent,
	FactorDividendComponent,
	FactorMessageComponent,
	FactorDynamicComponent,
	FactorAddComponent,
	FactorEditComponent,
  ],
entryComponents: [
	FactorCompleteComponent,
	FactorFieldNameComponent,
	FactorConditionalExpressionComponent,
	FactorDividendComponent,
	FactorMessageComponent,
	FactorDynamicComponent,
	FactorAddComponent,
	FactorEditComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	FactorCompleteComponent,
	FactorFieldNameComponent,
	FactorConditionalExpressionComponent,
	FactorDividendComponent,
	FactorMessageComponent,
	FactorDynamicComponent,
	FactorAddComponent,
	FactorEditComponent,
  ],

})
export class  FactorDecoratorsExtendedModule { }
