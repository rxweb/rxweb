import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { HexColorCompleteTemplateDrivenValidationDirectivesComponent } from './complete/hex-color-complete.component';
import { HexColorConditionalExpressionTemplateDrivenValidationDirectivesComponent } from './conditionalExpression/hex-color-conditional-expression.component';
import { HexColorMessageTemplateDrivenValidationDirectivesComponent } from './message/hex-color-message.component';
import { HexColorAddTemplateDrivenValidationDirectivesComponent } from './add/hex-color-add.component';

@NgModule({
  declarations: [
	HexColorCompleteTemplateDrivenValidationDirectivesComponent,
	HexColorConditionalExpressionTemplateDrivenValidationDirectivesComponent,
	HexColorMessageTemplateDrivenValidationDirectivesComponent,
	HexColorAddTemplateDrivenValidationDirectivesComponent,
  ],
entryComponents: [
	HexColorCompleteTemplateDrivenValidationDirectivesComponent,
	HexColorConditionalExpressionTemplateDrivenValidationDirectivesComponent,
	HexColorMessageTemplateDrivenValidationDirectivesComponent,
	HexColorAddTemplateDrivenValidationDirectivesComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	HexColorCompleteTemplateDrivenValidationDirectivesComponent,
	HexColorConditionalExpressionTemplateDrivenValidationDirectivesComponent,
	HexColorMessageTemplateDrivenValidationDirectivesComponent,
	HexColorAddTemplateDrivenValidationDirectivesComponent,
  ],

})
export class  HexColorTemplateDrivenValidationDirectivesExtendedModule { }
