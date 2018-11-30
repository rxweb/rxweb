import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { MaxNumberCompleteTemplateDrivenComponent } from './complete/max-number-complete.component';
import { MaxNumberValueTemplateDrivenComponent } from './value/max-number-value.component';
import { MaxNumberConditionalExpressionTemplateDrivenComponent } from './conditionalExpression/max-number-conditional-expression.component';
import { MaxNumberMessageTemplateDrivenComponent } from './message/max-number-message.component';
import { MaxNumberAddTemplateDrivenComponent } from './add/max-number-add.component';

@NgModule({
  declarations: [
	MaxNumberCompleteTemplateDrivenComponent,
	MaxNumberValueTemplateDrivenComponent,
	MaxNumberConditionalExpressionTemplateDrivenComponent,
	MaxNumberMessageTemplateDrivenComponent,
	MaxNumberAddTemplateDrivenComponent,
  ],
entryComponents: [
	MaxNumberCompleteTemplateDrivenComponent,
	MaxNumberValueTemplateDrivenComponent,
	MaxNumberConditionalExpressionTemplateDrivenComponent,
	MaxNumberMessageTemplateDrivenComponent,
	MaxNumberAddTemplateDrivenComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	MaxNumberCompleteTemplateDrivenComponent,
	MaxNumberValueTemplateDrivenComponent,
	MaxNumberConditionalExpressionTemplateDrivenComponent,
	MaxNumberMessageTemplateDrivenComponent,
	MaxNumberAddTemplateDrivenComponent,
  ],

})
export class  MaxNumberTemplateDrivenExtendedModule { }
