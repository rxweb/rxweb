import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { LessThanCompleteTemplateDrivenValidationDecoratorsComponent } from './complete/less-than-complete.component';
import { LessThanFieldNameTemplateDrivenValidationDecoratorsComponent } from './fieldName/less-than-field-name.component';
import { LessThanConditionalExpressionTemplateDrivenValidationDecoratorsComponent } from './conditionalExpression/less-than-conditional-expression.component';
import { LessThanMessageTemplateDrivenValidationDecoratorsComponent } from './message/less-than-message.component';
import { LessThanAddTemplateDrivenValidationDecoratorsComponent } from './add/less-than-add.component';

@NgModule({
  declarations: [
	LessThanCompleteTemplateDrivenValidationDecoratorsComponent,
	LessThanFieldNameTemplateDrivenValidationDecoratorsComponent,
	LessThanConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	LessThanMessageTemplateDrivenValidationDecoratorsComponent,
	LessThanAddTemplateDrivenValidationDecoratorsComponent,
  ],
entryComponents: [
	LessThanCompleteTemplateDrivenValidationDecoratorsComponent,
	LessThanFieldNameTemplateDrivenValidationDecoratorsComponent,
	LessThanConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	LessThanMessageTemplateDrivenValidationDecoratorsComponent,
	LessThanAddTemplateDrivenValidationDecoratorsComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	LessThanCompleteTemplateDrivenValidationDecoratorsComponent,
	LessThanFieldNameTemplateDrivenValidationDecoratorsComponent,
	LessThanConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	LessThanMessageTemplateDrivenValidationDecoratorsComponent,
	LessThanAddTemplateDrivenValidationDecoratorsComponent,
  ],

})
export class  LessThanTemplateDrivenValidationDecoratorsExtendedModule { }
