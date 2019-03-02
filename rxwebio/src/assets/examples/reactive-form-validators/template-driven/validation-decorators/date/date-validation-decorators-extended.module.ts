import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { DateCompleteTemplateDrivenValidationDecoratorsComponent } from './complete/date-complete.component';
import { DateConditionalExpressionTemplateDrivenValidationDecoratorsComponent } from './conditionalExpression/date-conditional-expression.component';
import { DateMessageTemplateDrivenValidationDecoratorsComponent } from './message/date-message.component';
import { DateAddTemplateDrivenValidationDecoratorsComponent } from './add/date-add.component';

@NgModule({
  declarations: [
	DateCompleteTemplateDrivenValidationDecoratorsComponent,
	DateConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	DateMessageTemplateDrivenValidationDecoratorsComponent,
	DateAddTemplateDrivenValidationDecoratorsComponent,
  ],
entryComponents: [
	DateCompleteTemplateDrivenValidationDecoratorsComponent,
	DateConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	DateMessageTemplateDrivenValidationDecoratorsComponent,
	DateAddTemplateDrivenValidationDecoratorsComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	DateCompleteTemplateDrivenValidationDecoratorsComponent,
	DateConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	DateMessageTemplateDrivenValidationDecoratorsComponent,
	DateAddTemplateDrivenValidationDecoratorsComponent,
  ],

})
export class  DateTemplateDrivenValidationDecoratorsExtendedModule { }
