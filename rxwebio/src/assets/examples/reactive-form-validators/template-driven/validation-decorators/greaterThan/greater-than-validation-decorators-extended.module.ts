import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { GreaterThanCompleteTemplateDrivenValidationDecoratorsComponent } from './complete/greater-than-complete.component';
import { GreaterThanFieldNameTemplateDrivenValidationDecoratorsComponent } from './fieldName/greater-than-field-name.component';
import { GreaterThanConditionalExpressionTemplateDrivenValidationDecoratorsComponent } from './conditionalExpression/greater-than-conditional-expression.component';
import { GreaterThanMessageTemplateDrivenValidationDecoratorsComponent } from './message/greater-than-message.component';
import { GreaterThanAddTemplateDrivenValidationDecoratorsComponent } from './add/greater-than-add.component';

@NgModule({
  declarations: [
	GreaterThanCompleteTemplateDrivenValidationDecoratorsComponent,
	GreaterThanFieldNameTemplateDrivenValidationDecoratorsComponent,
	GreaterThanConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	GreaterThanMessageTemplateDrivenValidationDecoratorsComponent,
	GreaterThanAddTemplateDrivenValidationDecoratorsComponent,
  ],
entryComponents: [
	GreaterThanCompleteTemplateDrivenValidationDecoratorsComponent,
	GreaterThanFieldNameTemplateDrivenValidationDecoratorsComponent,
	GreaterThanConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	GreaterThanMessageTemplateDrivenValidationDecoratorsComponent,
	GreaterThanAddTemplateDrivenValidationDecoratorsComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	GreaterThanCompleteTemplateDrivenValidationDecoratorsComponent,
	GreaterThanFieldNameTemplateDrivenValidationDecoratorsComponent,
	GreaterThanConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	GreaterThanMessageTemplateDrivenValidationDecoratorsComponent,
	GreaterThanAddTemplateDrivenValidationDecoratorsComponent,
  ],

})
export class  GreaterThanTemplateDrivenValidationDecoratorsExtendedModule { }
