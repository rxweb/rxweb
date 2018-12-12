import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { LongitudeCompleteTemplateDrivenValidationDirectivesComponent } from './complete/longitude-complete.component';
import { LongitudeConditionalExpressionTemplateDrivenValidationDirectivesComponent } from './conditionalExpression/longitude-conditional-expression.component';
import { LongitudeMessageTemplateDrivenValidationDirectivesComponent } from './message/longitude-message.component';
import { LongitudeAddTemplateDrivenValidationDirectivesComponent } from './add/longitude-add.component';

@NgModule({
  declarations: [
	LongitudeCompleteTemplateDrivenValidationDirectivesComponent,
	LongitudeConditionalExpressionTemplateDrivenValidationDirectivesComponent,
	LongitudeMessageTemplateDrivenValidationDirectivesComponent,
	LongitudeAddTemplateDrivenValidationDirectivesComponent,
  ],
entryComponents: [
	LongitudeCompleteTemplateDrivenValidationDirectivesComponent,
	LongitudeConditionalExpressionTemplateDrivenValidationDirectivesComponent,
	LongitudeMessageTemplateDrivenValidationDirectivesComponent,
	LongitudeAddTemplateDrivenValidationDirectivesComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	LongitudeCompleteTemplateDrivenValidationDirectivesComponent,
	LongitudeConditionalExpressionTemplateDrivenValidationDirectivesComponent,
	LongitudeMessageTemplateDrivenValidationDirectivesComponent,
	LongitudeAddTemplateDrivenValidationDirectivesComponent,
  ],

})
export class  LongitudeTemplateDrivenValidationDirectivesExtendedModule { }
