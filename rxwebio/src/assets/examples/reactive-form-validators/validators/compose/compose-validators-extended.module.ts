import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { ComposeCompleteValidatorComponent } from './complete/compose-complete.component';
import { ComposeValidatorsValidatorComponent } from './validators/compose-validators.component';
import { ComposeMessageKeyValidatorComponent } from './messageKey/compose-message-key.component';
import { ComposeConditionalExpressionValidatorComponent } from './conditionalExpression/compose-conditional-expression.component';
import { ComposeMessageValidatorComponent } from './message/compose-message.component';
import { ComposeDynamicValidatorComponent } from './dynamic/compose-dynamic.component';
import { ComposeAddValidatorComponent } from './add/compose-add.component';

@NgModule({
  declarations: [
	ComposeCompleteValidatorComponent,
	ComposeValidatorsValidatorComponent,
	ComposeMessageKeyValidatorComponent,
	ComposeConditionalExpressionValidatorComponent,
	ComposeMessageValidatorComponent,
	ComposeDynamicValidatorComponent,
	ComposeAddValidatorComponent,
  ],
entryComponents: [
	ComposeCompleteValidatorComponent,
	ComposeValidatorsValidatorComponent,
	ComposeMessageKeyValidatorComponent,
	ComposeConditionalExpressionValidatorComponent,
	ComposeMessageValidatorComponent,
	ComposeDynamicValidatorComponent,
	ComposeAddValidatorComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	ComposeCompleteValidatorComponent,
	ComposeValidatorsValidatorComponent,
	ComposeMessageKeyValidatorComponent,
	ComposeConditionalExpressionValidatorComponent,
	ComposeMessageValidatorComponent,
	ComposeDynamicValidatorComponent,
	ComposeAddValidatorComponent,
  ],

})
export class  ComposeValidatorsExtendedModule { }
