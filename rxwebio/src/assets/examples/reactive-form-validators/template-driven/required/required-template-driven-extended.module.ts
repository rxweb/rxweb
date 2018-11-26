import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { RequiredCompleteTemplateDrivenComponent } from './complete/required-complete.component';
import { RequiredConditionalExpressionTemplateDrivenComponent } from './conditionalExpression/required-conditional-expression.component';
import { RequiredMessageTemplateDrivenComponent } from './message/required-message.component';
import { RequiredAddTemplateDrivenComponent } from './add/required-add.component';

@NgModule({
  declarations: [
	RequiredCompleteTemplateDrivenComponent,
	RequiredConditionalExpressionTemplateDrivenComponent,
	RequiredMessageTemplateDrivenComponent,
	RequiredAddTemplateDrivenComponent,
  ],
entryComponents: [
	RequiredCompleteTemplateDrivenComponent,
	RequiredConditionalExpressionTemplateDrivenComponent,
	RequiredMessageTemplateDrivenComponent,
	RequiredAddTemplateDrivenComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	RequiredCompleteTemplateDrivenComponent,
	RequiredConditionalExpressionTemplateDrivenComponent,
	RequiredMessageTemplateDrivenComponent,
	RequiredAddTemplateDrivenComponent,
  ],

})
export class  RequiredTemplateDrivenExtendedModule { }
