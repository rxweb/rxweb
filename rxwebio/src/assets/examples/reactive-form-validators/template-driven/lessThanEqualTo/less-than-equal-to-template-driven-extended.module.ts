import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { LessThanEqualToCompleteTemplateDrivenComponent } from './complete/less-than-equal-to-complete.component';
import { LessThanEqualToFieldNameTemplateDrivenComponent } from './fieldName/less-than-equal-to-field-name.component';
import { LessThanEqualToConditionalExpressionTemplateDrivenComponent } from './conditionalExpression/less-than-equal-to-conditional-expression.component';
import { LessThanEqualToMessageTemplateDrivenComponent } from './message/less-than-equal-to-message.component';
import { LessThanEqualToAddTemplateDrivenComponent } from './add/less-than-equal-to-add.component';

@NgModule({
  declarations: [
	LessThanEqualToCompleteTemplateDrivenComponent,
	LessThanEqualToFieldNameTemplateDrivenComponent,
	LessThanEqualToConditionalExpressionTemplateDrivenComponent,
	LessThanEqualToMessageTemplateDrivenComponent,
	LessThanEqualToAddTemplateDrivenComponent,
  ],
entryComponents: [
	LessThanEqualToCompleteTemplateDrivenComponent,
	LessThanEqualToFieldNameTemplateDrivenComponent,
	LessThanEqualToConditionalExpressionTemplateDrivenComponent,
	LessThanEqualToMessageTemplateDrivenComponent,
	LessThanEqualToAddTemplateDrivenComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	LessThanEqualToCompleteTemplateDrivenComponent,
	LessThanEqualToFieldNameTemplateDrivenComponent,
	LessThanEqualToConditionalExpressionTemplateDrivenComponent,
	LessThanEqualToMessageTemplateDrivenComponent,
	LessThanEqualToAddTemplateDrivenComponent,
  ],

})
export class  LessThanEqualToTemplateDrivenExtendedModule { }
