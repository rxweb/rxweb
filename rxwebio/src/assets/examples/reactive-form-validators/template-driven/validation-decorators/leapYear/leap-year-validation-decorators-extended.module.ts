import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { LeapYearCompleteTemplateDrivenValidationDecoratorsComponent } from './complete/leap-year-complete.component';
import { LeapYearConditionalExpressionTemplateDrivenValidationDecoratorsComponent } from './conditionalExpression/leap-year-conditional-expression.component';
import { LeapYearMessageTemplateDrivenValidationDecoratorsComponent } from './message/leap-year-message.component';
import { LeapYearAddTemplateDrivenValidationDecoratorsComponent } from './add/leap-year-add.component';

@NgModule({
  declarations: [
	LeapYearCompleteTemplateDrivenValidationDecoratorsComponent,
	LeapYearConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	LeapYearMessageTemplateDrivenValidationDecoratorsComponent,
	LeapYearAddTemplateDrivenValidationDecoratorsComponent,
  ],
entryComponents: [
	LeapYearCompleteTemplateDrivenValidationDecoratorsComponent,
	LeapYearConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	LeapYearMessageTemplateDrivenValidationDecoratorsComponent,
	LeapYearAddTemplateDrivenValidationDecoratorsComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	LeapYearCompleteTemplateDrivenValidationDecoratorsComponent,
	LeapYearConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	LeapYearMessageTemplateDrivenValidationDecoratorsComponent,
	LeapYearAddTemplateDrivenValidationDecoratorsComponent,
  ],

})
export class  LeapYearTemplateDrivenValidationDecoratorsExtendedModule { }
