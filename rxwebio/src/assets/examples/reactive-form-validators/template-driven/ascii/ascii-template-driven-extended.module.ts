import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { AsciiCompleteTemplateDrivenComponent } from './complete/ascii-complete.component';
import { AsciiConditionalExpressionTemplateDrivenComponent } from './conditionalExpression/ascii-conditional-expression.component';
import { AsciiMessageTemplateDrivenComponent } from './message/ascii-message.component';
import { AsciiAddTemplateDrivenComponent } from './add/ascii-add.component';

@NgModule({
  declarations: [
	AsciiCompleteTemplateDrivenComponent,
	AsciiConditionalExpressionTemplateDrivenComponent,
	AsciiMessageTemplateDrivenComponent,
	AsciiAddTemplateDrivenComponent,
  ],
entryComponents: [
	AsciiCompleteTemplateDrivenComponent,
	AsciiConditionalExpressionTemplateDrivenComponent,
	AsciiMessageTemplateDrivenComponent,
	AsciiAddTemplateDrivenComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	AsciiCompleteTemplateDrivenComponent,
	AsciiConditionalExpressionTemplateDrivenComponent,
	AsciiMessageTemplateDrivenComponent,
	AsciiAddTemplateDrivenComponent,
  ],

})
export class  AsciiTemplateDrivenExtendedModule { }
