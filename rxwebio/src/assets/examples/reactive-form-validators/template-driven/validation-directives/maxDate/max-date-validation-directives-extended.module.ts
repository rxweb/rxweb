import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { MaxDateCompleteTemplateDrivenValidationDirectivesComponent } from './complete/max-date-complete.component';
import { MaxDateValueTemplateDrivenValidationDirectivesComponent } from './value/max-date-value.component';
import { MaxDateConditionalExpressionTemplateDrivenValidationDirectivesComponent } from './conditionalExpression/max-date-conditional-expression.component';
import { MaxDateMessageTemplateDrivenValidationDirectivesComponent } from './message/max-date-message.component';
import { MaxDateFieldNameTemplateDrivenValidationDirectivesComponent } from './fieldName/max-date-field-name.component';
import { MaxDateAddTemplateDrivenValidationDirectivesComponent } from './add/max-date-add.component';

@NgModule({
  declarations: [
	MaxDateCompleteTemplateDrivenValidationDirectivesComponent,
	MaxDateValueTemplateDrivenValidationDirectivesComponent,
	MaxDateConditionalExpressionTemplateDrivenValidationDirectivesComponent,
	MaxDateMessageTemplateDrivenValidationDirectivesComponent,
	MaxDateFieldNameTemplateDrivenValidationDirectivesComponent,
	MaxDateAddTemplateDrivenValidationDirectivesComponent,
  ],
entryComponents: [
	MaxDateCompleteTemplateDrivenValidationDirectivesComponent,
	MaxDateValueTemplateDrivenValidationDirectivesComponent,
	MaxDateConditionalExpressionTemplateDrivenValidationDirectivesComponent,
	MaxDateMessageTemplateDrivenValidationDirectivesComponent,
	MaxDateFieldNameTemplateDrivenValidationDirectivesComponent,
	MaxDateAddTemplateDrivenValidationDirectivesComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	MaxDateCompleteTemplateDrivenValidationDirectivesComponent,
	MaxDateValueTemplateDrivenValidationDirectivesComponent,
	MaxDateConditionalExpressionTemplateDrivenValidationDirectivesComponent,
	MaxDateMessageTemplateDrivenValidationDirectivesComponent,
	MaxDateFieldNameTemplateDrivenValidationDirectivesComponent,
	MaxDateAddTemplateDrivenValidationDirectivesComponent,
  ],

})
export class  MaxDateTemplateDrivenValidationDirectivesExtendedModule { }
