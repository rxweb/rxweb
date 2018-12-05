import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { PatternCompleteComponent } from './complete/pattern-complete.component';
import { PatternExpressionComponent } from './expression/pattern-expression.component';
import { PatternMessageComponent } from './message/pattern-message.component';
import { PatternConditionalExpressionComponent } from './conditionalExpression/pattern-conditional-expression.component';
import { PatternDynamicComponent } from './dynamic/pattern-dynamic.component';
import { PatternAddComponent } from './add/pattern-add.component';
import { PatternEditComponent } from './edit/pattern-edit.component';

@NgModule({
  declarations: [
	PatternCompleteComponent,
	PatternExpressionComponent,
	PatternMessageComponent,
	PatternConditionalExpressionComponent,
	PatternDynamicComponent,
	PatternAddComponent,
	PatternEditComponent,
  ],
entryComponents: [
	PatternCompleteComponent,
	PatternExpressionComponent,
	PatternMessageComponent,
	PatternConditionalExpressionComponent,
	PatternDynamicComponent,
	PatternAddComponent,
	PatternEditComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	PatternCompleteComponent,
	PatternExpressionComponent,
	PatternMessageComponent,
	PatternConditionalExpressionComponent,
	PatternDynamicComponent,
	PatternAddComponent,
	PatternEditComponent,
  ],

})
export class  PatternDecoratorsExtendedModule { }
