import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { FileCompleteComponent } from './complete/file-complete.component';
import { FileMaxFilesComponent } from './maxFiles/file-max-files.component';
import { FileMinFilesComponent } from './minFiles/file-min-files.component';
import { FileConditionalExpressionComponent } from './conditionalExpression/file-conditional-expression.component';
import { FileMessageComponent } from './message/file-message.component';
import { FileDynamicComponent } from './dynamic/file-dynamic.component';
import { FileAddComponent } from './add/file-add.component';
import { FileEditComponent } from './edit/file-edit.component';

@NgModule({
  declarations: [
	FileCompleteComponent,
	FileMaxFilesComponent,
	FileMinFilesComponent,
	FileConditionalExpressionComponent,
	FileMessageComponent,
	FileDynamicComponent,
	FileAddComponent,
	FileEditComponent,
  ],
entryComponents: [
	FileCompleteComponent,
	FileMaxFilesComponent,
	FileMinFilesComponent,
	FileConditionalExpressionComponent,
	FileMessageComponent,
	FileDynamicComponent,
	FileAddComponent,
	FileEditComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	FileCompleteComponent,
	FileMaxFilesComponent,
	FileMinFilesComponent,
	FileConditionalExpressionComponent,
	FileMessageComponent,
	FileDynamicComponent,
	FileAddComponent,
	FileEditComponent,
  ],

})
export class  FileDecoratorsExtendedModule { }
