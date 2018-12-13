import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { HexColorCompleteTemplateDrivenValidationDecoratorsComponent } from './complete/hex-color-complete.component';
import { HexColorConditionalExpressionTemplateDrivenValidationDecoratorsComponent } from './conditionalExpression/hex-color-conditional-expression.component';
import { HexColorMessageTemplateDrivenValidationDecoratorsComponent } from './message/hex-color-message.component';
import { HexColorAddTemplateDrivenValidationDecoratorsComponent } from './add/hex-color-add.component';

@NgModule({
  declarations: [
	HexColorCompleteTemplateDrivenValidationDecoratorsComponent,
	HexColorConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	HexColorMessageTemplateDrivenValidationDecoratorsComponent,
	HexColorAddTemplateDrivenValidationDecoratorsComponent,
  ],
entryComponents: [
	HexColorCompleteTemplateDrivenValidationDecoratorsComponent,
	HexColorConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	HexColorMessageTemplateDrivenValidationDecoratorsComponent,
	HexColorAddTemplateDrivenValidationDecoratorsComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	HexColorCompleteTemplateDrivenValidationDecoratorsComponent,
	HexColorConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	HexColorMessageTemplateDrivenValidationDecoratorsComponent,
	HexColorAddTemplateDrivenValidationDecoratorsComponent,
  ],

})
export class  HexColorTemplateDrivenValidationDecoratorsExtendedModule { }
