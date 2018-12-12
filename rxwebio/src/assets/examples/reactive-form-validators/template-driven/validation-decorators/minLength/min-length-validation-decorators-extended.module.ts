import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { MinLengthCompleteTemplateDrivenValidationDecoratorsComponent } from './complete/min-length-complete.component';
import { MinLengthValueTemplateDrivenValidationDecoratorsComponent } from './value/min-length-value.component';
import { MinLengthMessageTemplateDrivenValidationDecoratorsComponent } from './message/min-length-message.component';
import { MinLengthConditionalExpressionTemplateDrivenValidationDecoratorsComponent } from './conditionalExpression/min-length-conditional-expression.component';
import { MinLengthAddTemplateDrivenValidationDecoratorsComponent } from './add/min-length-add.component';

@NgModule({
  declarations: [
	MinLengthCompleteTemplateDrivenValidationDecoratorsComponent,
	MinLengthValueTemplateDrivenValidationDecoratorsComponent,
	MinLengthMessageTemplateDrivenValidationDecoratorsComponent,
	MinLengthConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	MinLengthAddTemplateDrivenValidationDecoratorsComponent,
  ],
entryComponents: [
	MinLengthCompleteTemplateDrivenValidationDecoratorsComponent,
	MinLengthValueTemplateDrivenValidationDecoratorsComponent,
	MinLengthMessageTemplateDrivenValidationDecoratorsComponent,
	MinLengthConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	MinLengthAddTemplateDrivenValidationDecoratorsComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	MinLengthCompleteTemplateDrivenValidationDecoratorsComponent,
	MinLengthValueTemplateDrivenValidationDecoratorsComponent,
	MinLengthMessageTemplateDrivenValidationDecoratorsComponent,
	MinLengthConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	MinLengthAddTemplateDrivenValidationDecoratorsComponent,
  ],

})
export class  MinLengthTemplateDrivenValidationDecoratorsExtendedModule { }
