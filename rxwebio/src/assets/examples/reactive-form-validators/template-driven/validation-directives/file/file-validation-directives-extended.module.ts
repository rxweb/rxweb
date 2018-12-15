import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { FileCompleteTemplateDrivenValidationDirectivesComponent } from './complete/file-complete.component';
import { FileMaxFilesTemplateDrivenValidationDirectivesComponent } from './maxFiles/file-max-files.component';
import { FileMinFilesTemplateDrivenValidationDirectivesComponent } from './minFiles/file-min-files.component';
import { FileConditionalExpressionTemplateDrivenValidationDirectivesComponent } from './conditionalExpression/file-conditional-expression.component';
import { FileMessageTemplateDrivenValidationDirectivesComponent } from './message/file-message.component';
import { FileAddTemplateDrivenValidationDirectivesComponent } from './add/file-add.component';

@NgModule({
  declarations: [
	FileCompleteTemplateDrivenValidationDirectivesComponent,
	FileMaxFilesTemplateDrivenValidationDirectivesComponent,
	FileMinFilesTemplateDrivenValidationDirectivesComponent,
	FileConditionalExpressionTemplateDrivenValidationDirectivesComponent,
	FileMessageTemplateDrivenValidationDirectivesComponent,
	FileAddTemplateDrivenValidationDirectivesComponent,
  ],
entryComponents: [
	FileCompleteTemplateDrivenValidationDirectivesComponent,
	FileMaxFilesTemplateDrivenValidationDirectivesComponent,
	FileMinFilesTemplateDrivenValidationDirectivesComponent,
	FileConditionalExpressionTemplateDrivenValidationDirectivesComponent,
	FileMessageTemplateDrivenValidationDirectivesComponent,
	FileAddTemplateDrivenValidationDirectivesComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	FileCompleteTemplateDrivenValidationDirectivesComponent,
	FileMaxFilesTemplateDrivenValidationDirectivesComponent,
	FileMinFilesTemplateDrivenValidationDirectivesComponent,
	FileConditionalExpressionTemplateDrivenValidationDirectivesComponent,
	FileMessageTemplateDrivenValidationDirectivesComponent,
	FileAddTemplateDrivenValidationDirectivesComponent,
  ],

})
export class  FileTemplateDrivenValidationDirectivesExtendedModule { }
