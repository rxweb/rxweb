import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { FileSizeCompleteTemplateDrivenValidationDecoratorsComponent } from './complete/file-size-complete.component';
import { FileSizeMaxSizeTemplateDrivenValidationDecoratorsComponent } from './maxSize/file-size-max-size.component';
import { FileSizeConditionalExpressionTemplateDrivenValidationDecoratorsComponent } from './conditionalExpression/file-size-conditional-expression.component';
import { FileSizeMessageTemplateDrivenValidationDecoratorsComponent } from './message/file-size-message.component';
import { FileSizeAddTemplateDrivenValidationDecoratorsComponent } from './add/file-size-add.component';

@NgModule({
  declarations: [
	FileSizeCompleteTemplateDrivenValidationDecoratorsComponent,
	FileSizeMaxSizeTemplateDrivenValidationDecoratorsComponent,
	FileSizeConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	FileSizeMessageTemplateDrivenValidationDecoratorsComponent,
	FileSizeAddTemplateDrivenValidationDecoratorsComponent,
  ],
entryComponents: [
	FileSizeCompleteTemplateDrivenValidationDecoratorsComponent,
	FileSizeMaxSizeTemplateDrivenValidationDecoratorsComponent,
	FileSizeConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	FileSizeMessageTemplateDrivenValidationDecoratorsComponent,
	FileSizeAddTemplateDrivenValidationDecoratorsComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	FileSizeCompleteTemplateDrivenValidationDecoratorsComponent,
	FileSizeMaxSizeTemplateDrivenValidationDecoratorsComponent,
	FileSizeConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	FileSizeMessageTemplateDrivenValidationDecoratorsComponent,
	FileSizeAddTemplateDrivenValidationDecoratorsComponent,
  ],

})
export class  FileSizeTemplateDrivenValidationDecoratorsExtendedModule { }
