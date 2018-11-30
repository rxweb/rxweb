import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { JsonCompleteTemplateDrivenComponent } from './complete/json-complete.component';
import { JsonMessageTemplateDrivenComponent } from './message/json-message.component';
import { JsonConditionalExpressionTemplateDrivenComponent } from './conditionalExpression/json-conditional-expression.component';
import { JsonAddTemplateDrivenComponent } from './add/json-add.component';

@NgModule({
  declarations: [
	JsonCompleteTemplateDrivenComponent,
	JsonMessageTemplateDrivenComponent,
	JsonConditionalExpressionTemplateDrivenComponent,
	JsonAddTemplateDrivenComponent,
  ],
entryComponents: [
	JsonCompleteTemplateDrivenComponent,
	JsonMessageTemplateDrivenComponent,
	JsonConditionalExpressionTemplateDrivenComponent,
	JsonAddTemplateDrivenComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	JsonCompleteTemplateDrivenComponent,
	JsonMessageTemplateDrivenComponent,
	JsonConditionalExpressionTemplateDrivenComponent,
	JsonAddTemplateDrivenComponent,
  ],

})
export class  JsonTemplateDrivenExtendedModule { }
