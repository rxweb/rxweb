import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { OddCompleteTemplateDrivenComponent } from './complete/odd-complete.component';
import { OddConditionalExpressionTemplateDrivenComponent } from './conditionalExpression/odd-conditional-expression.component';
import { OddMessageTemplateDrivenComponent } from './message/odd-message.component';
import { OddAddTemplateDrivenComponent } from './add/odd-add.component';

@NgModule({
  declarations: [
	OddCompleteTemplateDrivenComponent,
	OddConditionalExpressionTemplateDrivenComponent,
	OddMessageTemplateDrivenComponent,
	OddAddTemplateDrivenComponent,
  ],
entryComponents: [
	OddCompleteTemplateDrivenComponent,
	OddConditionalExpressionTemplateDrivenComponent,
	OddMessageTemplateDrivenComponent,
	OddAddTemplateDrivenComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	OddCompleteTemplateDrivenComponent,
	OddConditionalExpressionTemplateDrivenComponent,
	OddMessageTemplateDrivenComponent,
	OddAddTemplateDrivenComponent,
  ],

})
export class  OddTemplateDrivenExtendedModule { }
