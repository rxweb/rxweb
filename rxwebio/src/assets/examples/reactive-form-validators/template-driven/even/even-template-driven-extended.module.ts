import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { EvenCompleteTemplateDrivenComponent } from './complete/even-complete.component';
import { EvenConditionalExpressionTemplateDrivenComponent } from './conditionalExpression/even-conditional-expression.component';
import { EvenMessageTemplateDrivenComponent } from './message/even-message.component';
import { EvenAddTemplateDrivenComponent } from './add/even-add.component';

@NgModule({
  declarations: [
	EvenCompleteTemplateDrivenComponent,
	EvenConditionalExpressionTemplateDrivenComponent,
	EvenMessageTemplateDrivenComponent,
	EvenAddTemplateDrivenComponent,
  ],
entryComponents: [
	EvenCompleteTemplateDrivenComponent,
	EvenConditionalExpressionTemplateDrivenComponent,
	EvenMessageTemplateDrivenComponent,
	EvenAddTemplateDrivenComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	EvenCompleteTemplateDrivenComponent,
	EvenConditionalExpressionTemplateDrivenComponent,
	EvenMessageTemplateDrivenComponent,
	EvenAddTemplateDrivenComponent,
  ],

})
export class  EvenTemplateDrivenExtendedModule { }
