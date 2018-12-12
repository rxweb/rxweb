import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { JsonCompleteTemplateDrivenValidationDirectivesComponent } from './complete/json-complete.component';
import { JsonMessageTemplateDrivenValidationDirectivesComponent } from './message/json-message.component';
import { JsonConditionalExpressionTemplateDrivenValidationDirectivesComponent } from './conditionalExpression/json-conditional-expression.component';
import { JsonAddTemplateDrivenValidationDirectivesComponent } from './add/json-add.component';

@NgModule({
  declarations: [
	JsonCompleteTemplateDrivenValidationDirectivesComponent,
	JsonMessageTemplateDrivenValidationDirectivesComponent,
	JsonConditionalExpressionTemplateDrivenValidationDirectivesComponent,
	JsonAddTemplateDrivenValidationDirectivesComponent,
  ],
entryComponents: [
	JsonCompleteTemplateDrivenValidationDirectivesComponent,
	JsonMessageTemplateDrivenValidationDirectivesComponent,
	JsonConditionalExpressionTemplateDrivenValidationDirectivesComponent,
	JsonAddTemplateDrivenValidationDirectivesComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	JsonCompleteTemplateDrivenValidationDirectivesComponent,
	JsonMessageTemplateDrivenValidationDirectivesComponent,
	JsonConditionalExpressionTemplateDrivenValidationDirectivesComponent,
	JsonAddTemplateDrivenValidationDirectivesComponent,
  ],

})
export class  JsonTemplateDrivenValidationDirectivesExtendedModule { }
