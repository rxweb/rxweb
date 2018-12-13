import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { LatitudeCompleteTemplateDrivenValidationDecoratorsComponent } from './complete/latitude-complete.component';
import { LatitudeConditionalExpressionTemplateDrivenValidationDecoratorsComponent } from './conditionalExpression/latitude-conditional-expression.component';
import { LatitudeMessageTemplateDrivenValidationDecoratorsComponent } from './message/latitude-message.component';
import { LatitudeAddTemplateDrivenValidationDecoratorsComponent } from './add/latitude-add.component';

@NgModule({
  declarations: [
	LatitudeCompleteTemplateDrivenValidationDecoratorsComponent,
	LatitudeConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	LatitudeMessageTemplateDrivenValidationDecoratorsComponent,
	LatitudeAddTemplateDrivenValidationDecoratorsComponent,
  ],
entryComponents: [
	LatitudeCompleteTemplateDrivenValidationDecoratorsComponent,
	LatitudeConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	LatitudeMessageTemplateDrivenValidationDecoratorsComponent,
	LatitudeAddTemplateDrivenValidationDecoratorsComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	LatitudeCompleteTemplateDrivenValidationDecoratorsComponent,
	LatitudeConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	LatitudeMessageTemplateDrivenValidationDecoratorsComponent,
	LatitudeAddTemplateDrivenValidationDecoratorsComponent,
  ],

})
export class  LatitudeTemplateDrivenValidationDecoratorsExtendedModule { }
