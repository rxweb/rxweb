import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { GreaterThanEqualToCompleteTemplateDrivenValidationDecoratorsComponent } from './complete/greater-than-equal-to-complete.component';
import { GreaterThanEqualToFieldNameTemplateDrivenValidationDecoratorsComponent } from './fieldName/greater-than-equal-to-field-name.component';
import { GreaterThanEqualToConditionalExpressionTemplateDrivenValidationDecoratorsComponent } from './conditionalExpression/greater-than-equal-to-conditional-expression.component';
import { GreaterThanEqualToMessageTemplateDrivenValidationDecoratorsComponent } from './message/greater-than-equal-to-message.component';
import { GreaterThanEqualToAddTemplateDrivenValidationDecoratorsComponent } from './add/greater-than-equal-to-add.component';

@NgModule({
  declarations: [
	GreaterThanEqualToCompleteTemplateDrivenValidationDecoratorsComponent,
	GreaterThanEqualToFieldNameTemplateDrivenValidationDecoratorsComponent,
	GreaterThanEqualToConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	GreaterThanEqualToMessageTemplateDrivenValidationDecoratorsComponent,
	GreaterThanEqualToAddTemplateDrivenValidationDecoratorsComponent,
  ],
entryComponents: [
	GreaterThanEqualToCompleteTemplateDrivenValidationDecoratorsComponent,
	GreaterThanEqualToFieldNameTemplateDrivenValidationDecoratorsComponent,
	GreaterThanEqualToConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	GreaterThanEqualToMessageTemplateDrivenValidationDecoratorsComponent,
	GreaterThanEqualToAddTemplateDrivenValidationDecoratorsComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	GreaterThanEqualToCompleteTemplateDrivenValidationDecoratorsComponent,
	GreaterThanEqualToFieldNameTemplateDrivenValidationDecoratorsComponent,
	GreaterThanEqualToConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	GreaterThanEqualToMessageTemplateDrivenValidationDecoratorsComponent,
	GreaterThanEqualToAddTemplateDrivenValidationDecoratorsComponent,
  ],

})
export class  GreaterThanEqualToTemplateDrivenValidationDecoratorsExtendedModule { }
