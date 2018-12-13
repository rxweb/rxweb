import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { ImageCompleteTemplateDrivenValidationDecoratorsComponent } from './complete/image-complete.component';
import { ImageMaxHeightTemplateDrivenValidationDecoratorsComponent } from './maxHeight/image-max-height.component';
import { ImageMaxWidthTemplateDrivenValidationDecoratorsComponent } from './maxWidth/image-max-width.component';
import { ImageMinHeightTemplateDrivenValidationDecoratorsComponent } from './minHeight/image-min-height.component';
import { ImageConditionalExpressionTemplateDrivenValidationDecoratorsComponent } from './conditionalExpression/image-conditional-expression.component';
import { ImageMessageTemplateDrivenValidationDecoratorsComponent } from './message/image-message.component';
import { ImageAddTemplateDrivenValidationDecoratorsComponent } from './add/image-add.component';

@NgModule({
  declarations: [
	ImageCompleteTemplateDrivenValidationDecoratorsComponent,
	ImageMaxHeightTemplateDrivenValidationDecoratorsComponent,
	ImageMaxWidthTemplateDrivenValidationDecoratorsComponent,
	ImageMinHeightTemplateDrivenValidationDecoratorsComponent,
	ImageConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	ImageMessageTemplateDrivenValidationDecoratorsComponent,
	ImageAddTemplateDrivenValidationDecoratorsComponent,
  ],
entryComponents: [
	ImageCompleteTemplateDrivenValidationDecoratorsComponent,
	ImageMaxHeightTemplateDrivenValidationDecoratorsComponent,
	ImageMaxWidthTemplateDrivenValidationDecoratorsComponent,
	ImageMinHeightTemplateDrivenValidationDecoratorsComponent,
	ImageConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	ImageMessageTemplateDrivenValidationDecoratorsComponent,
	ImageAddTemplateDrivenValidationDecoratorsComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	ImageCompleteTemplateDrivenValidationDecoratorsComponent,
	ImageMaxHeightTemplateDrivenValidationDecoratorsComponent,
	ImageMaxWidthTemplateDrivenValidationDecoratorsComponent,
	ImageMinHeightTemplateDrivenValidationDecoratorsComponent,
	ImageConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	ImageMessageTemplateDrivenValidationDecoratorsComponent,
	ImageAddTemplateDrivenValidationDecoratorsComponent,
  ],

})
export class  ImageTemplateDrivenValidationDecoratorsExtendedModule { }
