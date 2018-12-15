import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { TimeCompleteTemplateDrivenValidationDecoratorsComponent } from './complete/time-complete.component';
import { TimeConditionalExpressionTemplateDrivenValidationDecoratorsComponent } from './conditionalExpression/time-conditional-expression.component';
import { TimeAllowSecondsTemplateDrivenValidationDecoratorsComponent } from './allowSeconds/time-allow-seconds.component';
import { TimeMessageTemplateDrivenValidationDecoratorsComponent } from './message/time-message.component';
import { TimeAddTemplateDrivenValidationDecoratorsComponent } from './add/time-add.component';

@NgModule({
  declarations: [
	TimeCompleteTemplateDrivenValidationDecoratorsComponent,
	TimeConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	TimeAllowSecondsTemplateDrivenValidationDecoratorsComponent,
	TimeMessageTemplateDrivenValidationDecoratorsComponent,
	TimeAddTemplateDrivenValidationDecoratorsComponent,
  ],
entryComponents: [
	TimeCompleteTemplateDrivenValidationDecoratorsComponent,
	TimeConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	TimeAllowSecondsTemplateDrivenValidationDecoratorsComponent,
	TimeMessageTemplateDrivenValidationDecoratorsComponent,
	TimeAddTemplateDrivenValidationDecoratorsComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	TimeCompleteTemplateDrivenValidationDecoratorsComponent,
	TimeConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	TimeAllowSecondsTemplateDrivenValidationDecoratorsComponent,
	TimeMessageTemplateDrivenValidationDecoratorsComponent,
	TimeAddTemplateDrivenValidationDecoratorsComponent,
  ],

})
export class  TimeTemplateDrivenValidationDecoratorsExtendedModule { }
