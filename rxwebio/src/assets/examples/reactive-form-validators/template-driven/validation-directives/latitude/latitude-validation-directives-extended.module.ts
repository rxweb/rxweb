import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { LatitudeCompleteTemplateDrivenValidationDirectivesComponent } from './complete/latitude-complete.component';
import { LatitudeConditionalExpressionTemplateDrivenValidationDirectivesComponent } from './conditionalExpression/latitude-conditional-expression.component';
import { LatitudeMessageTemplateDrivenValidationDirectivesComponent } from './message/latitude-message.component';
import { LatitudeAddTemplateDrivenValidationDirectivesComponent } from './add/latitude-add.component';

@NgModule({
  declarations: [
	LatitudeCompleteTemplateDrivenValidationDirectivesComponent,
	LatitudeConditionalExpressionTemplateDrivenValidationDirectivesComponent,
	LatitudeMessageTemplateDrivenValidationDirectivesComponent,
	LatitudeAddTemplateDrivenValidationDirectivesComponent,
  ],
entryComponents: [
	LatitudeCompleteTemplateDrivenValidationDirectivesComponent,
	LatitudeConditionalExpressionTemplateDrivenValidationDirectivesComponent,
	LatitudeMessageTemplateDrivenValidationDirectivesComponent,
	LatitudeAddTemplateDrivenValidationDirectivesComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	LatitudeCompleteTemplateDrivenValidationDirectivesComponent,
	LatitudeConditionalExpressionTemplateDrivenValidationDirectivesComponent,
	LatitudeMessageTemplateDrivenValidationDirectivesComponent,
	LatitudeAddTemplateDrivenValidationDirectivesComponent,
  ],

})
export class  LatitudeTemplateDrivenValidationDirectivesExtendedModule { }
