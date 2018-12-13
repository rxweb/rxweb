import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { RangeCompleteTemplateDrivenValidationDirectivesComponent } from './complete/range-complete.component';
import { RangeMinimumNumberTemplateDrivenValidationDirectivesComponent } from './minimumNumber/range-minimum-number.component';
import { RangeMaximumNumberTemplateDrivenValidationDirectivesComponent } from './maximumNumber/range-maximum-number.component';
import { RangeConditionalExpressionTemplateDrivenValidationDirectivesComponent } from './conditionalExpression/range-conditional-expression.component';
import { RangeMessageTemplateDrivenValidationDirectivesComponent } from './message/range-message.component';
import { RangeAddTemplateDrivenValidationDirectivesComponent } from './add/range-add.component';

@NgModule({
  declarations: [
	RangeCompleteTemplateDrivenValidationDirectivesComponent,
	RangeMinimumNumberTemplateDrivenValidationDirectivesComponent,
	RangeMaximumNumberTemplateDrivenValidationDirectivesComponent,
	RangeConditionalExpressionTemplateDrivenValidationDirectivesComponent,
	RangeMessageTemplateDrivenValidationDirectivesComponent,
	RangeAddTemplateDrivenValidationDirectivesComponent,
  ],
entryComponents: [
	RangeCompleteTemplateDrivenValidationDirectivesComponent,
	RangeMinimumNumberTemplateDrivenValidationDirectivesComponent,
	RangeMaximumNumberTemplateDrivenValidationDirectivesComponent,
	RangeConditionalExpressionTemplateDrivenValidationDirectivesComponent,
	RangeMessageTemplateDrivenValidationDirectivesComponent,
	RangeAddTemplateDrivenValidationDirectivesComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	RangeCompleteTemplateDrivenValidationDirectivesComponent,
	RangeMinimumNumberTemplateDrivenValidationDirectivesComponent,
	RangeMaximumNumberTemplateDrivenValidationDirectivesComponent,
	RangeConditionalExpressionTemplateDrivenValidationDirectivesComponent,
	RangeMessageTemplateDrivenValidationDirectivesComponent,
	RangeAddTemplateDrivenValidationDirectivesComponent,
  ],

})
export class  RangeTemplateDrivenValidationDirectivesExtendedModule { }
