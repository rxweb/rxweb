import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { LongitudeCompleteTemplateDrivenValidationDecoratorsComponent } from './complete/longitude-complete.component';
import { LongitudeConditionalExpressionTemplateDrivenValidationDecoratorsComponent } from './conditionalExpression/longitude-conditional-expression.component';
import { LongitudeMessageTemplateDrivenValidationDecoratorsComponent } from './message/longitude-message.component';
import { LongitudeAddTemplateDrivenValidationDecoratorsComponent } from './add/longitude-add.component';

@NgModule({
  declarations: [
	LongitudeCompleteTemplateDrivenValidationDecoratorsComponent,
	LongitudeConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	LongitudeMessageTemplateDrivenValidationDecoratorsComponent,
	LongitudeAddTemplateDrivenValidationDecoratorsComponent,
  ],
entryComponents: [
	LongitudeCompleteTemplateDrivenValidationDecoratorsComponent,
	LongitudeConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	LongitudeMessageTemplateDrivenValidationDecoratorsComponent,
	LongitudeAddTemplateDrivenValidationDecoratorsComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	LongitudeCompleteTemplateDrivenValidationDecoratorsComponent,
	LongitudeConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	LongitudeMessageTemplateDrivenValidationDecoratorsComponent,
	LongitudeAddTemplateDrivenValidationDecoratorsComponent,
  ],

})
export class  LongitudeTemplateDrivenValidationDecoratorsExtendedModule { }
