import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { FileSizeCompleteValidatorComponent } from './complete/file-size-complete.component';
import { FileSizeMaxSizeValidatorComponent } from './maxSize/file-size-max-size.component';
import { FileSizeConditionalExpressionValidatorComponent } from './conditionalExpression/file-size-conditional-expression.component';
import { FileSizeMessageValidatorComponent } from './message/file-size-message.component';
import { FileSizeDynamicValidatorComponent } from './dynamic/file-size-dynamic.component';
import { FileSizeAddValidatorComponent } from './add/file-size-add.component';

@NgModule({
  declarations: [
	FileSizeCompleteValidatorComponent,
	FileSizeMaxSizeValidatorComponent,
	FileSizeConditionalExpressionValidatorComponent,
	FileSizeMessageValidatorComponent,
	FileSizeDynamicValidatorComponent,
	FileSizeAddValidatorComponent,
  ],
entryComponents: [
	FileSizeCompleteValidatorComponent,
	FileSizeMaxSizeValidatorComponent,
	FileSizeConditionalExpressionValidatorComponent,
	FileSizeMessageValidatorComponent,
	FileSizeDynamicValidatorComponent,
	FileSizeAddValidatorComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	FileSizeCompleteValidatorComponent,
	FileSizeMaxSizeValidatorComponent,
	FileSizeConditionalExpressionValidatorComponent,
	FileSizeMessageValidatorComponent,
	FileSizeDynamicValidatorComponent,
	FileSizeAddValidatorComponent,
  ],

})
export class  FileSizeValidatorsExtendedModule { }
