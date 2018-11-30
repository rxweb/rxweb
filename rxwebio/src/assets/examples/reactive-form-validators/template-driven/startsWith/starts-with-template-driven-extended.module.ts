import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { StartsWithCompleteTemplateDrivenComponent } from './complete/starts-with-complete.component';
import { StartsWithValueTemplateDrivenComponent } from './value/starts-with-value.component';
import { StartsWithMessageTemplateDrivenComponent } from './message/starts-with-message.component';
import { StartsWithConditionalExpressionTemplateDrivenComponent } from './conditionalExpression/starts-with-conditional-expression.component';
import { StartsWithAddTemplateDrivenComponent } from './add/starts-with-add.component';

@NgModule({
  declarations: [
	StartsWithCompleteTemplateDrivenComponent,
	StartsWithValueTemplateDrivenComponent,
	StartsWithMessageTemplateDrivenComponent,
	StartsWithConditionalExpressionTemplateDrivenComponent,
	StartsWithAddTemplateDrivenComponent,
  ],
entryComponents: [
	StartsWithCompleteTemplateDrivenComponent,
	StartsWithValueTemplateDrivenComponent,
	StartsWithMessageTemplateDrivenComponent,
	StartsWithConditionalExpressionTemplateDrivenComponent,
	StartsWithAddTemplateDrivenComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	StartsWithCompleteTemplateDrivenComponent,
	StartsWithValueTemplateDrivenComponent,
	StartsWithMessageTemplateDrivenComponent,
	StartsWithConditionalExpressionTemplateDrivenComponent,
	StartsWithAddTemplateDrivenComponent,
  ],

})
export class  StartsWithTemplateDrivenExtendedModule { }
