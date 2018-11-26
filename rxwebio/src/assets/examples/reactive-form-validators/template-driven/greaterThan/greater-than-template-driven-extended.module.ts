import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { GreaterThanCompleteTemplateDrivenComponent } from './complete/greater-than-complete.component';
import { GreaterThanFieldNameTemplateDrivenComponent } from './fieldName/greater-than-field-name.component';
import { GreaterThanConditionalExpressionTemplateDrivenComponent } from './conditionalExpression/greater-than-conditional-expression.component';
import { GreaterThanMessageTemplateDrivenComponent } from './message/greater-than-message.component';
import { GreaterThanAddTemplateDrivenComponent } from './add/greater-than-add.component';

@NgModule({
  declarations: [
	GreaterThanCompleteTemplateDrivenComponent,
	GreaterThanFieldNameTemplateDrivenComponent,
	GreaterThanConditionalExpressionTemplateDrivenComponent,
	GreaterThanMessageTemplateDrivenComponent,
	GreaterThanAddTemplateDrivenComponent,
  ],
entryComponents: [
	GreaterThanCompleteTemplateDrivenComponent,
	GreaterThanFieldNameTemplateDrivenComponent,
	GreaterThanConditionalExpressionTemplateDrivenComponent,
	GreaterThanMessageTemplateDrivenComponent,
	GreaterThanAddTemplateDrivenComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	GreaterThanCompleteTemplateDrivenComponent,
	GreaterThanFieldNameTemplateDrivenComponent,
	GreaterThanConditionalExpressionTemplateDrivenComponent,
	GreaterThanMessageTemplateDrivenComponent,
	GreaterThanAddTemplateDrivenComponent,
  ],

})
export class  GreaterThanTemplateDrivenExtendedModule { }
