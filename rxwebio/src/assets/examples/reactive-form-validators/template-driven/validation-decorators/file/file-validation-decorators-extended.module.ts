import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { FileCompleteTemplateDrivenValidationDecoratorsComponent } from './complete/file-complete.component';
import { FileMaxFilesTemplateDrivenValidationDecoratorsComponent } from './maxFiles/file-max-files.component';
import { FileMinFilesTemplateDrivenValidationDecoratorsComponent } from './minFiles/file-min-files.component';
import { FileConditionalExpressionTemplateDrivenValidationDecoratorsComponent } from './conditionalExpression/file-conditional-expression.component';
import { FileMessageTemplateDrivenValidationDecoratorsComponent } from './message/file-message.component';
import { FileAddTemplateDrivenValidationDecoratorsComponent } from './add/file-add.component';

@NgModule({
  declarations: [
	FileCompleteTemplateDrivenValidationDecoratorsComponent,
	FileMaxFilesTemplateDrivenValidationDecoratorsComponent,
	FileMinFilesTemplateDrivenValidationDecoratorsComponent,
	FileConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	FileMessageTemplateDrivenValidationDecoratorsComponent,
	FileAddTemplateDrivenValidationDecoratorsComponent,
  ],
entryComponents: [
	FileCompleteTemplateDrivenValidationDecoratorsComponent,
	FileMaxFilesTemplateDrivenValidationDecoratorsComponent,
	FileMinFilesTemplateDrivenValidationDecoratorsComponent,
	FileConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	FileMessageTemplateDrivenValidationDecoratorsComponent,
	FileAddTemplateDrivenValidationDecoratorsComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	FileCompleteTemplateDrivenValidationDecoratorsComponent,
	FileMaxFilesTemplateDrivenValidationDecoratorsComponent,
	FileMinFilesTemplateDrivenValidationDecoratorsComponent,
	FileConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	FileMessageTemplateDrivenValidationDecoratorsComponent,
	FileAddTemplateDrivenValidationDecoratorsComponent,
  ],

})
export class  FileTemplateDrivenValidationDecoratorsExtendedModule { }
