import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { AsciiCompleteTemplateDrivenValidationDecoratorsComponent } from './complete/ascii-complete.component';
import { AsciiConditionalExpressionTemplateDrivenValidationDecoratorsComponent } from './conditionalExpression/ascii-conditional-expression.component';
import { AsciiMessageTemplateDrivenValidationDecoratorsComponent } from './message/ascii-message.component';
import { AsciiAddTemplateDrivenValidationDecoratorsComponent } from './add/ascii-add.component';

@NgModule({
  declarations: [
	AsciiCompleteTemplateDrivenValidationDecoratorsComponent,
	AsciiConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	AsciiMessageTemplateDrivenValidationDecoratorsComponent,
	AsciiAddTemplateDrivenValidationDecoratorsComponent,
  ],
entryComponents: [
	AsciiCompleteTemplateDrivenValidationDecoratorsComponent,
	AsciiConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	AsciiMessageTemplateDrivenValidationDecoratorsComponent,
	AsciiAddTemplateDrivenValidationDecoratorsComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	AsciiCompleteTemplateDrivenValidationDecoratorsComponent,
	AsciiConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	AsciiMessageTemplateDrivenValidationDecoratorsComponent,
	AsciiAddTemplateDrivenValidationDecoratorsComponent,
  ],

})
export class  AsciiTemplateDrivenValidationDecoratorsExtendedModule { }
