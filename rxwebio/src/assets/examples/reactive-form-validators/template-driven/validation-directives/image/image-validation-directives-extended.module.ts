import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { ImageCompleteTemplateDrivenValidationDirectivesComponent } from './complete/image-complete.component';
import { ImageMaxHeightTemplateDrivenValidationDirectivesComponent } from './maxHeight/image-max-height.component';
import { ImageMaxWidthTemplateDrivenValidationDirectivesComponent } from './maxWidth/image-max-width.component';
import { ImageConditionalExpressionTemplateDrivenValidationDirectivesComponent } from './conditionalExpression/image-conditional-expression.component';
import { ImageMessageTemplateDrivenValidationDirectivesComponent } from './message/image-message.component';
import { ImageAddTemplateDrivenValidationDirectivesComponent } from './add/image-add.component';

@NgModule({
  declarations: [
	ImageCompleteTemplateDrivenValidationDirectivesComponent,
	ImageMaxHeightTemplateDrivenValidationDirectivesComponent,
	ImageMaxWidthTemplateDrivenValidationDirectivesComponent,
	ImageConditionalExpressionTemplateDrivenValidationDirectivesComponent,
	ImageMessageTemplateDrivenValidationDirectivesComponent,
	ImageAddTemplateDrivenValidationDirectivesComponent,
  ],
entryComponents: [
	ImageCompleteTemplateDrivenValidationDirectivesComponent,
	ImageMaxHeightTemplateDrivenValidationDirectivesComponent,
	ImageMaxWidthTemplateDrivenValidationDirectivesComponent,
	ImageConditionalExpressionTemplateDrivenValidationDirectivesComponent,
	ImageMessageTemplateDrivenValidationDirectivesComponent,
	ImageAddTemplateDrivenValidationDirectivesComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	ImageCompleteTemplateDrivenValidationDirectivesComponent,
	ImageMaxHeightTemplateDrivenValidationDirectivesComponent,
	ImageMaxWidthTemplateDrivenValidationDirectivesComponent,
	ImageConditionalExpressionTemplateDrivenValidationDirectivesComponent,
	ImageMessageTemplateDrivenValidationDirectivesComponent,
	ImageAddTemplateDrivenValidationDirectivesComponent,
  ],

})
export class  ImageTemplateDrivenValidationDirectivesExtendedModule { }
