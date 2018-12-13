import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { MacCompleteTemplateDrivenValidationDecoratorsComponent } from './complete/mac-complete.component';
import { MacConditionalExpressionTemplateDrivenValidationDecoratorsComponent } from './conditionalExpression/mac-conditional-expression.component';
import { MacMessageTemplateDrivenValidationDecoratorsComponent } from './message/mac-message.component';
import { MacAddTemplateDrivenValidationDecoratorsComponent } from './add/mac-add.component';

@NgModule({
  declarations: [
	MacCompleteTemplateDrivenValidationDecoratorsComponent,
	MacConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	MacMessageTemplateDrivenValidationDecoratorsComponent,
	MacAddTemplateDrivenValidationDecoratorsComponent,
  ],
entryComponents: [
	MacCompleteTemplateDrivenValidationDecoratorsComponent,
	MacConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	MacMessageTemplateDrivenValidationDecoratorsComponent,
	MacAddTemplateDrivenValidationDecoratorsComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	MacCompleteTemplateDrivenValidationDecoratorsComponent,
	MacConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	MacMessageTemplateDrivenValidationDecoratorsComponent,
	MacAddTemplateDrivenValidationDecoratorsComponent,
  ],

})
export class  MacTemplateDrivenValidationDecoratorsExtendedModule { }
