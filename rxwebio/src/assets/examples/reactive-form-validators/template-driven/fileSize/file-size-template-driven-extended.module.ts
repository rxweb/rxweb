import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { FileSizeCompleteTemplateDrivenComponent } from './complete/file-size-complete.component';
import { FileSizeMaxSizeTemplateDrivenComponent } from './maxSize/file-size-max-size.component';
import { FileSizeConditionalExpressionTemplateDrivenComponent } from './conditionalExpression/file-size-conditional-expression.component';
import { FileSizeMessageTemplateDrivenComponent } from './message/file-size-message.component';
import { FileSizeAddTemplateDrivenComponent } from './add/file-size-add.component';

@NgModule({
  declarations: [
	FileSizeCompleteTemplateDrivenComponent,
	FileSizeMaxSizeTemplateDrivenComponent,
	FileSizeConditionalExpressionTemplateDrivenComponent,
	FileSizeMessageTemplateDrivenComponent,
	FileSizeAddTemplateDrivenComponent,
  ],
entryComponents: [
	FileSizeCompleteTemplateDrivenComponent,
	FileSizeMaxSizeTemplateDrivenComponent,
	FileSizeConditionalExpressionTemplateDrivenComponent,
	FileSizeMessageTemplateDrivenComponent,
	FileSizeAddTemplateDrivenComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	FileSizeCompleteTemplateDrivenComponent,
	FileSizeMaxSizeTemplateDrivenComponent,
	FileSizeConditionalExpressionTemplateDrivenComponent,
	FileSizeMessageTemplateDrivenComponent,
	FileSizeAddTemplateDrivenComponent,
  ],

})
export class  FileSizeTemplateDrivenExtendedModule { }
