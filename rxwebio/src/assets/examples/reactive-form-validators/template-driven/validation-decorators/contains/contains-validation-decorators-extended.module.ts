import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { ContainsCompleteTemplateDrivenValidationDecoratorsComponent } from './complete/contains-complete.component';
import { ContainsValueTemplateDrivenValidationDecoratorsComponent } from './value/contains-value.component';
import { ContainsConditionalExpressionTemplateDrivenValidationDecoratorsComponent } from './conditionalExpression/contains-conditional-expression.component';
import { ContainsMessageTemplateDrivenValidationDecoratorsComponent } from './message/contains-message.component';
import { ContainsAddTemplateDrivenValidationDecoratorsComponent } from './add/contains-add.component';

@NgModule({
  declarations: [
	ContainsCompleteTemplateDrivenValidationDecoratorsComponent,
	ContainsValueTemplateDrivenValidationDecoratorsComponent,
	ContainsConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	ContainsMessageTemplateDrivenValidationDecoratorsComponent,
	ContainsAddTemplateDrivenValidationDecoratorsComponent,
  ],
entryComponents: [
	ContainsCompleteTemplateDrivenValidationDecoratorsComponent,
	ContainsValueTemplateDrivenValidationDecoratorsComponent,
	ContainsConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	ContainsMessageTemplateDrivenValidationDecoratorsComponent,
	ContainsAddTemplateDrivenValidationDecoratorsComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	ContainsCompleteTemplateDrivenValidationDecoratorsComponent,
	ContainsValueTemplateDrivenValidationDecoratorsComponent,
	ContainsConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	ContainsMessageTemplateDrivenValidationDecoratorsComponent,
	ContainsAddTemplateDrivenValidationDecoratorsComponent,
  ],

})
export class  ContainsTemplateDrivenValidationDecoratorsExtendedModule { }
