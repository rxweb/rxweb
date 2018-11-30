import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { PatternCompleteValidatorComponent } from './complete/pattern-complete.component';
import { PatternPatternValidatorComponent } from './pattern/pattern-pattern.component';
import { PatternMessageValidatorComponent } from './message/pattern-message.component';
import { PatternConditionalExpressionValidatorComponent } from './conditionalExpression/pattern-conditional-expression.component';
import { PatternDynamicValidatorComponent } from './dynamic/pattern-dynamic.component';
import { PatternAddValidatorComponent } from './add/pattern-add.component';

@NgModule({
  declarations: [
	PatternCompleteValidatorComponent,
	PatternPatternValidatorComponent,
	PatternMessageValidatorComponent,
	PatternConditionalExpressionValidatorComponent,
	PatternDynamicValidatorComponent,
	PatternAddValidatorComponent,
  ],
entryComponents: [
	PatternCompleteValidatorComponent,
	PatternPatternValidatorComponent,
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
	PatternPatternValidatorComponent,
	PatternMessageValidatorComponent,
	PatternConditionalExpressionValidatorComponent,
	PatternDynamicValidatorComponent,
	PatternAddValidatorComponent,
  ],

})
export class  PatternValidatorsExtendedModule { }
