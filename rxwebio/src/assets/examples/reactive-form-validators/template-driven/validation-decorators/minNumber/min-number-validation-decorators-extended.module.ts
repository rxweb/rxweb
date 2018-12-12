import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { MinNumberCompleteTemplateDrivenValidationDecoratorsComponent } from './complete/min-number-complete.component';
import { MinNumberValueTemplateDrivenValidationDecoratorsComponent } from './value/min-number-value.component';
import { MinNumberMessageTemplateDrivenValidationDecoratorsComponent } from './message/min-number-message.component';
import { MinNumberConditionalExpressionTemplateDrivenValidationDecoratorsComponent } from './conditionalExpression/min-number-conditional-expression.component';
import { MinNumberAddTemplateDrivenValidationDecoratorsComponent } from './add/min-number-add.component';

@NgModule({
  declarations: [
	MinNumberCompleteTemplateDrivenValidationDecoratorsComponent,
	MinNumberValueTemplateDrivenValidationDecoratorsComponent,
	MinNumberMessageTemplateDrivenValidationDecoratorsComponent,
	MinNumberConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	MinNumberAddTemplateDrivenValidationDecoratorsComponent,
  ],
entryComponents: [
	MinNumberCompleteTemplateDrivenValidationDecoratorsComponent,
	MinNumberValueTemplateDrivenValidationDecoratorsComponent,
	MinNumberMessageTemplateDrivenValidationDecoratorsComponent,
	MinNumberConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	MinNumberAddTemplateDrivenValidationDecoratorsComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	MinNumberCompleteTemplateDrivenValidationDecoratorsComponent,
	MinNumberValueTemplateDrivenValidationDecoratorsComponent,
	MinNumberMessageTemplateDrivenValidationDecoratorsComponent,
	MinNumberConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	MinNumberAddTemplateDrivenValidationDecoratorsComponent,
  ],

})
export class  MinNumberTemplateDrivenValidationDecoratorsExtendedModule { }
