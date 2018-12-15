import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { ExtensionCompleteTemplateDrivenValidationDecoratorsComponent } from './complete/extension-complete.component';
import { ExtensionExtensionsTemplateDrivenValidationDecoratorsComponent } from './extensions/extension-extensions.component';
import { ExtensionConditionalExpressionTemplateDrivenValidationDecoratorsComponent } from './conditionalExpression/extension-conditional-expression.component';
import { ExtensionMessageTemplateDrivenValidationDecoratorsComponent } from './message/extension-message.component';
import { ExtensionAddTemplateDrivenValidationDecoratorsComponent } from './add/extension-add.component';

@NgModule({
  declarations: [
	ExtensionCompleteTemplateDrivenValidationDecoratorsComponent,
	ExtensionExtensionsTemplateDrivenValidationDecoratorsComponent,
	ExtensionConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	ExtensionMessageTemplateDrivenValidationDecoratorsComponent,
	ExtensionAddTemplateDrivenValidationDecoratorsComponent,
  ],
entryComponents: [
	ExtensionCompleteTemplateDrivenValidationDecoratorsComponent,
	ExtensionExtensionsTemplateDrivenValidationDecoratorsComponent,
	ExtensionConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	ExtensionMessageTemplateDrivenValidationDecoratorsComponent,
	ExtensionAddTemplateDrivenValidationDecoratorsComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	ExtensionCompleteTemplateDrivenValidationDecoratorsComponent,
	ExtensionExtensionsTemplateDrivenValidationDecoratorsComponent,
	ExtensionConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	ExtensionMessageTemplateDrivenValidationDecoratorsComponent,
	ExtensionAddTemplateDrivenValidationDecoratorsComponent,
  ],

})
export class  ExtensionTemplateDrivenValidationDecoratorsExtendedModule { }
