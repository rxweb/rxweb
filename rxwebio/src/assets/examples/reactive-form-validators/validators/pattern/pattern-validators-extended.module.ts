import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { PatternCompleteValidatorComponent } from './complete/pattern-complete.component';
import { PatternExpressionValidatorComponent } from './expression/pattern-expression.component';
import { PatternMessageValidatorComponent } from './message/pattern-message.component';
import { PatternConditionalExpressionValidatorComponent } from './conditionalExpression/pattern-conditional-expression.component';
import { PatternDynamicValidatorComponent } from './dynamic/pattern-dynamic.component';
import { PatternAddValidatorComponent } from './add/pattern-add.component';

@NgModule({
  declarations: [
	PatternCompleteValidatorComponent,
	PatternExpressionValidatorComponent,
	PatternMessageValidatorComponent,
	PatternConditionalExpressionValidatorComponent,
	PatternDynamicValidatorComponent,
	PatternAddValidatorComponent,
  ],
entryComponents: [
	PatternCompleteValidatorComponent,
	PatternExpressionValidatorComponent,
	PatternMessageValidatorComponent,
	PatternConditionalExpressionValidatorComponent,
	PatternDynamicValidatorComponent,
	PatternAddValidatorComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	PatternCompleteValidatorComponent,
	PatternExpressionValidatorComponent,
	PatternMessageValidatorComponent,
	PatternConditionalExpressionValidatorComponent,
	PatternDynamicValidatorComponent,
	PatternAddValidatorComponent,
  ],

})
export class  PatternValidatorsExtendedModule { }
