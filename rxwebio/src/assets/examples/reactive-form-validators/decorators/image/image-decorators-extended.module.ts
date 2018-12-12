import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { ImageCompleteComponent } from './complete/image-complete.component';
import { ImageMaxHeightComponent } from './maxHeight/image-max-height.component';
import { ImageMaxWidthComponent } from './maxWidth/image-max-width.component';
import { ImageConditionalExpressionComponent } from './conditionalExpression/image-conditional-expression.component';
import { ImageMessageComponent } from './message/image-message.component';
import { ImageDynamicComponent } from './dynamic/image-dynamic.component';
import { ImageAddComponent } from './add/image-add.component';
import { ImageEditComponent } from './edit/image-edit.component';

@NgModule({
  declarations: [
	ImageCompleteComponent,
	ImageMaxHeightComponent,
	ImageMaxWidthComponent,
	ImageConditionalExpressionComponent,
	ImageMessageComponent,
	ImageDynamicComponent,
	ImageAddComponent,
	ImageEditComponent,
  ],
entryComponents: [
	ImageCompleteComponent,
	ImageMaxHeightComponent,
	ImageMaxWidthComponent,
	ImageConditionalExpressionComponent,
	ImageMessageComponent,
	ImageDynamicComponent,
	ImageAddComponent,
	ImageEditComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	ImageCompleteComponent,
	ImageMaxHeightComponent,
	ImageMaxWidthComponent,
	ImageConditionalExpressionComponent,
	ImageMessageComponent,
	ImageDynamicComponent,
	ImageAddComponent,
	ImageEditComponent,
  ],

})
export class  ImageDecoratorsExtendedModule { }
