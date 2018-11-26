import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { MinNumberCompleteTemplateDrivenComponent } from './complete/min-number-complete.component';
import { MinNumberValueTemplateDrivenComponent } from './value/min-number-value.component';
import { MinNumberMessageTemplateDrivenComponent } from './message/min-number-message.component';
import { MinNumberConditionalExpressionTemplateDrivenComponent } from './conditionalExpression/min-number-conditional-expression.component';
import { MinNumberAddTemplateDrivenComponent } from './add/min-number-add.component';

@NgModule({
  declarations: [
	MinNumberCompleteTemplateDrivenComponent,
	MinNumberValueTemplateDrivenComponent,
	MinNumberMessageTemplateDrivenComponent,
	MinNumberConditionalExpressionTemplateDrivenComponent,
	MinNumberAddTemplateDrivenComponent,
  ],
entryComponents: [
	MinNumberCompleteTemplateDrivenComponent,
	MinNumberValueTemplateDrivenComponent,
	MinNumberMessageTemplateDrivenComponent,
	MinNumberConditionalExpressionTemplateDrivenComponent,
	MinNumberAddTemplateDrivenComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	MinNumberCompleteTemplateDrivenComponent,
	MinNumberValueTemplateDrivenComponent,
	MinNumberMessageTemplateDrivenComponent,
	MinNumberConditionalExpressionTemplateDrivenComponent,
	MinNumberAddTemplateDrivenComponent,
  ],

})
export class  MinNumberTemplateDrivenExtendedModule { }
