import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { DifferentCompleteTemplateDrivenComponent } from './complete/different-complete.component';
import { DifferentFieldNameTemplateDrivenComponent } from './fieldName/different-field-name.component';
import { DifferentMessageTemplateDrivenComponent } from './message/different-message.component';
import { DifferentConditionalExpressionTemplateDrivenComponent } from './conditionalExpression/different-conditional-expression.component';
import { DifferentAddTemplateDrivenComponent } from './add/different-add.component';

@NgModule({
  declarations: [
	DifferentCompleteTemplateDrivenComponent,
	DifferentFieldNameTemplateDrivenComponent,
	DifferentMessageTemplateDrivenComponent,
	DifferentConditionalExpressionTemplateDrivenComponent,
	DifferentAddTemplateDrivenComponent,
  ],
entryComponents: [
	DifferentCompleteTemplateDrivenComponent,
	DifferentFieldNameTemplateDrivenComponent,
	DifferentMessageTemplateDrivenComponent,
	DifferentConditionalExpressionTemplateDrivenComponent,
	DifferentAddTemplateDrivenComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	DifferentCompleteTemplateDrivenComponent,
	DifferentFieldNameTemplateDrivenComponent,
	DifferentMessageTemplateDrivenComponent,
	DifferentConditionalExpressionTemplateDrivenComponent,
	DifferentAddTemplateDrivenComponent,
  ],

})
export class  DifferentTemplateDrivenExtendedModule { }
