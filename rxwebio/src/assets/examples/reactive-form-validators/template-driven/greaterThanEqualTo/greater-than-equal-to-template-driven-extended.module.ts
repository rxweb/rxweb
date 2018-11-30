import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { GreaterThanEqualToCompleteTemplateDrivenComponent } from './complete/greater-than-equal-to-complete.component';
import { GreaterThanEqualToFieldNameTemplateDrivenComponent } from './fieldName/greater-than-equal-to-field-name.component';
import { GreaterThanEqualToConditionalExpressionTemplateDrivenComponent } from './conditionalExpression/greater-than-equal-to-conditional-expression.component';
import { GreaterThanEqualToMessageTemplateDrivenComponent } from './message/greater-than-equal-to-message.component';
import { GreaterThanEqualToAddTemplateDrivenComponent } from './add/greater-than-equal-to-add.component';

@NgModule({
  declarations: [
	GreaterThanEqualToCompleteTemplateDrivenComponent,
	GreaterThanEqualToFieldNameTemplateDrivenComponent,
	GreaterThanEqualToConditionalExpressionTemplateDrivenComponent,
	GreaterThanEqualToMessageTemplateDrivenComponent,
	GreaterThanEqualToAddTemplateDrivenComponent,
  ],
entryComponents: [
	GreaterThanEqualToCompleteTemplateDrivenComponent,
	GreaterThanEqualToFieldNameTemplateDrivenComponent,
	GreaterThanEqualToConditionalExpressionTemplateDrivenComponent,
	GreaterThanEqualToMessageTemplateDrivenComponent,
	GreaterThanEqualToAddTemplateDrivenComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	GreaterThanEqualToCompleteTemplateDrivenComponent,
	GreaterThanEqualToFieldNameTemplateDrivenComponent,
	GreaterThanEqualToConditionalExpressionTemplateDrivenComponent,
	GreaterThanEqualToMessageTemplateDrivenComponent,
	GreaterThanEqualToAddTemplateDrivenComponent,
  ],

})
export class  GreaterThanEqualToTemplateDrivenExtendedModule { }
