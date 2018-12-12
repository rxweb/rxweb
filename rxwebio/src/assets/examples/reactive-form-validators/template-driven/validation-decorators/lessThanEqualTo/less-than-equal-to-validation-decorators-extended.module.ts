import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { LessThanEqualToCompleteTemplateDrivenValidationDecoratorsComponent } from './complete/less-than-equal-to-complete.component';
import { LessThanEqualToFieldNameTemplateDrivenValidationDecoratorsComponent } from './fieldName/less-than-equal-to-field-name.component';
import { LessThanEqualToConditionalExpressionTemplateDrivenValidationDecoratorsComponent } from './conditionalExpression/less-than-equal-to-conditional-expression.component';
import { LessThanEqualToMessageTemplateDrivenValidationDecoratorsComponent } from './message/less-than-equal-to-message.component';
import { LessThanEqualToAddTemplateDrivenValidationDecoratorsComponent } from './add/less-than-equal-to-add.component';

@NgModule({
  declarations: [
	LessThanEqualToCompleteTemplateDrivenValidationDecoratorsComponent,
	LessThanEqualToFieldNameTemplateDrivenValidationDecoratorsComponent,
	LessThanEqualToConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	LessThanEqualToMessageTemplateDrivenValidationDecoratorsComponent,
	LessThanEqualToAddTemplateDrivenValidationDecoratorsComponent,
  ],
entryComponents: [
	LessThanEqualToCompleteTemplateDrivenValidationDecoratorsComponent,
	LessThanEqualToFieldNameTemplateDrivenValidationDecoratorsComponent,
	LessThanEqualToConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	LessThanEqualToMessageTemplateDrivenValidationDecoratorsComponent,
	LessThanEqualToAddTemplateDrivenValidationDecoratorsComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	LessThanEqualToCompleteTemplateDrivenValidationDecoratorsComponent,
	LessThanEqualToFieldNameTemplateDrivenValidationDecoratorsComponent,
	LessThanEqualToConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	LessThanEqualToMessageTemplateDrivenValidationDecoratorsComponent,
	LessThanEqualToAddTemplateDrivenValidationDecoratorsComponent,
  ],

})
export class  LessThanEqualToTemplateDrivenValidationDecoratorsExtendedModule { }
