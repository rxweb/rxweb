import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { FileCompleteValidatorComponent } from './complete/file-complete.component';
import { FileMaxFilesValidatorComponent } from './maxFiles/file-max-files.component';
import { FileMinFilesValidatorComponent } from './minFiles/file-min-files.component';
import { FileConditionalExpressionValidatorComponent } from './conditionalExpression/file-conditional-expression.component';
import { FileMessageValidatorComponent } from './message/file-message.component';
import { FileDynamicValidatorComponent } from './dynamic/file-dynamic.component';
import { FileAddValidatorComponent } from './add/file-add.component';

@NgModule({
  declarations: [
	FileCompleteValidatorComponent,
	FileMaxFilesValidatorComponent,
	FileMinFilesValidatorComponent,
	FileConditionalExpressionValidatorComponent,
	FileMessageValidatorComponent,
	FileDynamicValidatorComponent,
	FileAddValidatorComponent,
  ],
entryComponents: [
	FileCompleteValidatorComponent,
	FileMaxFilesValidatorComponent,
	FileMinFilesValidatorComponent,
	FileConditionalExpressionValidatorComponent,
	FileMessageValidatorComponent,
	FileDynamicValidatorComponent,
	FileAddValidatorComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	FileCompleteValidatorComponent,
	FileMaxFilesValidatorComponent,
	FileMinFilesValidatorComponent,
	FileConditionalExpressionValidatorComponent,
	FileMessageValidatorComponent,
	FileDynamicValidatorComponent,
	FileAddValidatorComponent,
  ],

})
export class  FileValidatorsExtendedModule { }
