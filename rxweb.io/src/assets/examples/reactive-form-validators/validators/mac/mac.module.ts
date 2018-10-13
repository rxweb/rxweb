import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { MacCompleteValidatorComponent } from './complete/mac-complete.component';
import { MacConditionalExpressionValidatorComponent } from './conditionalExpression/mac-conditional-expression.component';
import { MacMessageValidatorComponent } from './message/mac-message.component';
import { MacDynamicValidatorComponent } from './dynamic/mac-dynamic.component';
import { MacAddValidatorComponent } from './add/mac-add.component';

@NgModule({
  declarations: [
	MacCompleteValidatorComponent,
	MacConditionalExpressionValidatorComponent,
	MacMessageValidatorComponent,
	MacDynamicValidatorComponent,
	MacAddValidatorComponent,
  ],
entryComponents: [
	MacCompleteValidatorComponent,
	MacConditionalExpressionValidatorComponent,
	MacMessageValidatorComponent,
	MacDynamicValidatorComponent,
	MacAddValidatorComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	MacCompleteValidatorComponent,
	MacConditionalExpressionValidatorComponent,
	MacMessageValidatorComponent,
	MacDynamicValidatorComponent,
	MacAddValidatorComponent,
  ],

})
export class  MacExtendedModule { }
