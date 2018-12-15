import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { MaxLengthCompleteTemplateDrivenValidationDecoratorsComponent } from './complete/max-length-complete.component';
import { MaxLengthValueTemplateDrivenValidationDecoratorsComponent } from './value/max-length-value.component';
import { MaxLengthConditionalExpressionTemplateDrivenValidationDecoratorsComponent } from './conditionalExpression/max-length-conditional-expression.component';
import { MaxLengthMessageTemplateDrivenValidationDecoratorsComponent } from './message/max-length-message.component';
import { MaxLengthAddTemplateDrivenValidationDecoratorsComponent } from './add/max-length-add.component';

@NgModule({
  declarations: [
	MaxLengthCompleteTemplateDrivenValidationDecoratorsComponent,
	MaxLengthValueTemplateDrivenValidationDecoratorsComponent,
	MaxLengthConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	MaxLengthMessageTemplateDrivenValidationDecoratorsComponent,
	MaxLengthAddTemplateDrivenValidationDecoratorsComponent,
  ],
entryComponents: [
	MaxLengthCompleteTemplateDrivenValidationDecoratorsComponent,
	MaxLengthValueTemplateDrivenValidationDecoratorsComponent,
	MaxLengthConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	MaxLengthMessageTemplateDrivenValidationDecoratorsComponent,
	MaxLengthAddTemplateDrivenValidationDecoratorsComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	MaxLengthCompleteTemplateDrivenValidationDecoratorsComponent,
	MaxLengthValueTemplateDrivenValidationDecoratorsComponent,
	MaxLengthConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	MaxLengthMessageTemplateDrivenValidationDecoratorsComponent,
	MaxLengthAddTemplateDrivenValidationDecoratorsComponent,
  ],

})
export class  MaxLengthTemplateDrivenValidationDecoratorsExtendedModule { }
