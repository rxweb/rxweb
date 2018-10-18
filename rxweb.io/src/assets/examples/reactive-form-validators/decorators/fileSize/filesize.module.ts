import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { FileSizeCompleteComponent } from './complete/file-size-complete.component';
import { FileSizeMaxSizeComponent } from './maxSize/file-size-max-size.component';
import { FileSizeConditionalExpressionComponent } from './conditionalExpression/file-size-conditional-expression.component';
import { FileSizeMessageComponent } from './message/file-size-message.component';
import { FileSizeDynamicComponent } from './dynamic/file-size-dynamic.component';
import { FileSizeAddComponent } from './add/file-size-add.component';
import { FileSizeEditComponent } from './edit/file-size-edit.component';

@NgModule({
  declarations: [
	FileSizeCompleteComponent,
	FileSizeMaxSizeComponent,
	FileSizeConditionalExpressionComponent,
	FileSizeMessageComponent,
	FileSizeDynamicComponent,
	FileSizeAddComponent,
	FileSizeEditComponent,
  ],
entryComponents: [
	FileSizeCompleteComponent,
	FileSizeMaxSizeComponent,
	FileSizeConditionalExpressionComponent,
	FileSizeMessageComponent,
	FileSizeDynamicComponent,
	FileSizeAddComponent,
	FileSizeEditComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	FileSizeCompleteComponent,
	FileSizeMaxSizeComponent,
	FileSizeConditionalExpressionComponent,
	FileSizeMessageComponent,
	FileSizeDynamicComponent,
	FileSizeAddComponent,
	FileSizeEditComponent,
  ],

})
export class  FileSizeExtendedModule { }
