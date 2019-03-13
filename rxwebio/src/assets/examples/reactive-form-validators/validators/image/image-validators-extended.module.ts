import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { ImageCompleteValidatorComponent } from './complete/image-complete.component';
import { ImageMaxHeightValidatorComponent } from './maxHeight/image-max-height.component';
import { ImageMaxWidthValidatorComponent } from './maxWidth/image-max-width.component';
import { ImageMinHeightValidatorComponent } from './minHeight/image-min-height.component';
import { ImageMinWidthValidatorComponent } from './minWidth/image-min-width.component';
import { ImageConditionalExpressionValidatorComponent } from './conditionalExpression/image-conditional-expression.component';
import { ImageMessageValidatorComponent } from './message/image-message.component';
import { ImageDynamicValidatorComponent } from './dynamic/image-dynamic.component';
import { ImageAddValidatorComponent } from './add/image-add.component';

@NgModule({
  declarations: [
	ImageCompleteValidatorComponent,
	ImageMaxHeightValidatorComponent,
	ImageMaxWidthValidatorComponent,
	ImageMinHeightValidatorComponent,
	ImageMinWidthValidatorComponent,
	ImageConditionalExpressionValidatorComponent,
	ImageMessageValidatorComponent,
	ImageDynamicValidatorComponent,
	ImageAddValidatorComponent,
  ],
entryComponents: [
	ImageCompleteValidatorComponent,
	ImageMaxHeightValidatorComponent,
	ImageMaxWidthValidatorComponent,
	ImageMinHeightValidatorComponent,
	ImageMinWidthValidatorComponent,
	ImageConditionalExpressionValidatorComponent,
	ImageMessageValidatorComponent,
	ImageDynamicValidatorComponent,
	ImageAddValidatorComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	ImageCompleteValidatorComponent,
	ImageMaxHeightValidatorComponent,
	ImageMaxWidthValidatorComponent,
	ImageMinHeightValidatorComponent,
	ImageMinWidthValidatorComponent,
	ImageConditionalExpressionValidatorComponent,
	ImageMessageValidatorComponent,
	ImageDynamicValidatorComponent,
	ImageAddValidatorComponent,
  ],

})
export class  ImageValidatorsExtendedModule { }
