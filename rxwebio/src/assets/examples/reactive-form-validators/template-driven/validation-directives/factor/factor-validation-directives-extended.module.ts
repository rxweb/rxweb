import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { FactorCompleteTemplateDrivenValidationDirectivesComponent } from './complete/factor-complete.component';
import { FactorFieldNameTemplateDrivenValidationDirectivesComponent } from './fieldName/factor-field-name.component';
import { FactorConditionalExpressionTemplateDrivenValidationDirectivesComponent } from './conditionalExpression/factor-conditional-expression.component';
import { FactorDividendTemplateDrivenValidationDirectivesComponent } from './dividend/factor-dividend.component';
import { FactorMessageTemplateDrivenValidationDirectivesComponent } from './message/factor-message.component';
import { FactorAddTemplateDrivenValidationDirectivesComponent } from './add/factor-add.component';

@NgModule({
  declarations: [
	FactorCompleteTemplateDrivenValidationDirectivesComponent,
	FactorFieldNameTemplateDrivenValidationDirectivesComponent,
	FactorConditionalExpressionTemplateDrivenValidationDirectivesComponent,
	FactorDividendTemplateDrivenValidationDirectivesComponent,
	FactorMessageTemplateDrivenValidationDirectivesComponent,
	FactorAddTemplateDrivenValidationDirectivesComponent,
  ],
entryComponents: [
	FactorCompleteTemplateDrivenValidationDirectivesComponent,
	FactorFieldNameTemplateDrivenValidationDirectivesComponent,
	FactorConditionalExpressionTemplateDrivenValidationDirectivesComponent,
	FactorDividendTemplateDrivenValidationDirectivesComponent,
	FactorMessageTemplateDrivenValidationDirectivesComponent,
	FactorAddTemplateDrivenValidationDirectivesComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	FactorCompleteTemplateDrivenValidationDirectivesComponent,
	FactorFieldNameTemplateDrivenValidationDirectivesComponent,
	FactorConditionalExpressionTemplateDrivenValidationDirectivesComponent,
	FactorDividendTemplateDrivenValidationDirectivesComponent,
	FactorMessageTemplateDrivenValidationDirectivesComponent,
	FactorAddTemplateDrivenValidationDirectivesComponent,
  ],

})
export class  FactorTemplateDrivenValidationDirectivesExtendedModule { }
