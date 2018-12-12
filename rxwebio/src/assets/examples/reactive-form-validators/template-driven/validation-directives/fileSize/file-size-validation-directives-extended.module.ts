import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { FileSizeCompleteTemplateDrivenValidationDirectivesComponent } from './complete/file-size-complete.component';
import { FileSizeMaxSizeTemplateDrivenValidationDirectivesComponent } from './maxSize/file-size-max-size.component';
import { FileSizeConditionalExpressionTemplateDrivenValidationDirectivesComponent } from './conditionalExpression/file-size-conditional-expression.component';
import { FileSizeMessageTemplateDrivenValidationDirectivesComponent } from './message/file-size-message.component';
import { FileSizeAddTemplateDrivenValidationDirectivesComponent } from './add/file-size-add.component';

@NgModule({
  declarations: [
	FileSizeCompleteTemplateDrivenValidationDirectivesComponent,
	FileSizeMaxSizeTemplateDrivenValidationDirectivesComponent,
	FileSizeConditionalExpressionTemplateDrivenValidationDirectivesComponent,
	FileSizeMessageTemplateDrivenValidationDirectivesComponent,
	FileSizeAddTemplateDrivenValidationDirectivesComponent,
  ],
entryComponents: [
	FileSizeCompleteTemplateDrivenValidationDirectivesComponent,
	FileSizeMaxSizeTemplateDrivenValidationDirectivesComponent,
	FileSizeConditionalExpressionTemplateDrivenValidationDirectivesComponent,
	FileSizeMessageTemplateDrivenValidationDirectivesComponent,
	FileSizeAddTemplateDrivenValidationDirectivesComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	FileSizeCompleteTemplateDrivenValidationDirectivesComponent,
	FileSizeMaxSizeTemplateDrivenValidationDirectivesComponent,
	FileSizeConditionalExpressionTemplateDrivenValidationDirectivesComponent,
	FileSizeMessageTemplateDrivenValidationDirectivesComponent,
	FileSizeAddTemplateDrivenValidationDirectivesComponent,
  ],

})
export class  FileSizeTemplateDrivenValidationDirectivesExtendedModule { }
