import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { PatternCompleteTemplateDrivenComponent } from './complete/pattern-complete.component';
import { PatternExpressionTemplateDrivenComponent } from './expression/pattern-expression.component';
import { PatternMessageTemplateDrivenComponent } from './message/pattern-message.component';
import { PatternConditionalExpressionTemplateDrivenComponent } from './conditionalExpression/pattern-conditional-expression.component';
import { PatternAddTemplateDrivenComponent } from './add/pattern-add.component';

@NgModule({
  declarations: [
	PatternCompleteTemplateDrivenComponent,
	PatternExpressionTemplateDrivenComponent,
	PatternMessageTemplateDrivenComponent,
	PatternConditionalExpressionTemplateDrivenComponent,
	PatternAddTemplateDrivenComponent,
  ],
entryComponents: [
	PatternCompleteTemplateDrivenComponent,
	PatternExpressionTemplateDrivenComponent,
	PatternMessageTemplateDrivenComponent,
	PatternConditionalExpressionTemplateDrivenComponent,
	PatternAddTemplateDrivenComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	PatternCompleteTemplateDrivenComponent,
	PatternExpressionTemplateDrivenComponent,
	PatternMessageTemplateDrivenComponent,
	PatternConditionalExpressionTemplateDrivenComponent,
	PatternAddTemplateDrivenComponent,
  ],

})
export class  PatternTemplateDrivenExtendedModule { }
