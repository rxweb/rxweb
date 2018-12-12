import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { FactorCompleteTemplateDrivenValidationDecoratorsComponent } from './complete/factor-complete.component';
import { FactorFieldNameTemplateDrivenValidationDecoratorsComponent } from './fieldName/factor-field-name.component';
import { FactorConditionalExpressionTemplateDrivenValidationDecoratorsComponent } from './conditionalExpression/factor-conditional-expression.component';
import { FactorDividendTemplateDrivenValidationDecoratorsComponent } from './dividend/factor-dividend.component';
import { FactorMessageTemplateDrivenValidationDecoratorsComponent } from './message/factor-message.component';
import { FactorAddTemplateDrivenValidationDecoratorsComponent } from './add/factor-add.component';

@NgModule({
  declarations: [
	FactorCompleteTemplateDrivenValidationDecoratorsComponent,
	FactorFieldNameTemplateDrivenValidationDecoratorsComponent,
	FactorConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	FactorDividendTemplateDrivenValidationDecoratorsComponent,
	FactorMessageTemplateDrivenValidationDecoratorsComponent,
	FactorAddTemplateDrivenValidationDecoratorsComponent,
  ],
entryComponents: [
	FactorCompleteTemplateDrivenValidationDecoratorsComponent,
	FactorFieldNameTemplateDrivenValidationDecoratorsComponent,
	FactorConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	FactorDividendTemplateDrivenValidationDecoratorsComponent,
	FactorMessageTemplateDrivenValidationDecoratorsComponent,
	FactorAddTemplateDrivenValidationDecoratorsComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	FactorCompleteTemplateDrivenValidationDecoratorsComponent,
	FactorFieldNameTemplateDrivenValidationDecoratorsComponent,
	FactorConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	FactorDividendTemplateDrivenValidationDecoratorsComponent,
	FactorMessageTemplateDrivenValidationDecoratorsComponent,
	FactorAddTemplateDrivenValidationDecoratorsComponent,
  ],

})
export class  FactorTemplateDrivenValidationDecoratorsExtendedModule { }
