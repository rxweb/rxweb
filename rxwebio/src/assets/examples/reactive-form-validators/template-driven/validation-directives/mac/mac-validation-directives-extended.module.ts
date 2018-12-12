import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { MacCompleteTemplateDrivenValidationDirectivesComponent } from './complete/mac-complete.component';
import { MacConditionalExpressionTemplateDrivenValidationDirectivesComponent } from './conditionalExpression/mac-conditional-expression.component';
import { MacMessageTemplateDrivenValidationDirectivesComponent } from './message/mac-message.component';
import { MacAddTemplateDrivenValidationDirectivesComponent } from './add/mac-add.component';

@NgModule({
  declarations: [
	MacCompleteTemplateDrivenValidationDirectivesComponent,
	MacConditionalExpressionTemplateDrivenValidationDirectivesComponent,
	MacMessageTemplateDrivenValidationDirectivesComponent,
	MacAddTemplateDrivenValidationDirectivesComponent,
  ],
entryComponents: [
	MacCompleteTemplateDrivenValidationDirectivesComponent,
	MacConditionalExpressionTemplateDrivenValidationDirectivesComponent,
	MacMessageTemplateDrivenValidationDirectivesComponent,
	MacAddTemplateDrivenValidationDirectivesComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	MacCompleteTemplateDrivenValidationDirectivesComponent,
	MacConditionalExpressionTemplateDrivenValidationDirectivesComponent,
	MacMessageTemplateDrivenValidationDirectivesComponent,
	MacAddTemplateDrivenValidationDirectivesComponent,
  ],

})
export class  MacTemplateDrivenValidationDirectivesExtendedModule { }
