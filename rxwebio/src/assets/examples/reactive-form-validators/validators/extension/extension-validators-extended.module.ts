import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { ExtensionCompleteValidatorComponent } from './complete/extension-complete.component';
import { ExtensionExtensionsValidatorComponent } from './extensions/extension-extensions.component';
import { ExtensionConditionalExpressionValidatorComponent } from './conditionalExpression/extension-conditional-expression.component';
import { ExtensionMessageValidatorComponent } from './message/extension-message.component';
import { ExtensionDynamicValidatorComponent } from './dynamic/extension-dynamic.component';
import { ExtensionAddValidatorComponent } from './add/extension-add.component';

@NgModule({
  declarations: [
	ExtensionCompleteValidatorComponent,
	ExtensionExtensionsValidatorComponent,
	ExtensionConditionalExpressionValidatorComponent,
	ExtensionMessageValidatorComponent,
	ExtensionDynamicValidatorComponent,
	ExtensionAddValidatorComponent,
  ],
entryComponents: [
	ExtensionCompleteValidatorComponent,
	ExtensionExtensionsValidatorComponent,
	ExtensionConditionalExpressionValidatorComponent,
	ExtensionMessageValidatorComponent,
	ExtensionDynamicValidatorComponent,
	ExtensionAddValidatorComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	ExtensionCompleteValidatorComponent,
	ExtensionExtensionsValidatorComponent,
	ExtensionConditionalExpressionValidatorComponent,
	ExtensionMessageValidatorComponent,
	ExtensionDynamicValidatorComponent,
	ExtensionAddValidatorComponent,
  ],

})
export class  ExtensionValidatorsExtendedModule { }
