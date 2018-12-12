import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { PatternCompleteTemplateDrivenValidationDirectivesComponent } from './complete/pattern-complete.component';
import { PatternExpressionTemplateDrivenValidationDirectivesComponent } from './expression/pattern-expression.component';
import { PatternMessageTemplateDrivenValidationDirectivesComponent } from './message/pattern-message.component';
import { PatternConditionalExpressionTemplateDrivenValidationDirectivesComponent } from './conditionalExpression/pattern-conditional-expression.component';
import { PatternAddTemplateDrivenValidationDirectivesComponent } from './add/pattern-add.component';

@NgModule({
  declarations: [
	PatternCompleteTemplateDrivenValidationDirectivesComponent,
	PatternExpressionTemplateDrivenValidationDirectivesComponent,
	PatternMessageTemplateDrivenValidationDirectivesComponent,
	PatternConditionalExpressionTemplateDrivenValidationDirectivesComponent,
	PatternAddTemplateDrivenValidationDirectivesComponent,
  ],
entryComponents: [
	PatternCompleteTemplateDrivenValidationDirectivesComponent,
	PatternExpressionTemplateDrivenValidationDirectivesComponent,
	PatternMessageTemplateDrivenValidationDirectivesComponent,
	PatternConditionalExpressionTemplateDrivenValidationDirectivesComponent,
	PatternAddTemplateDrivenValidationDirectivesComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	PatternCompleteTemplateDrivenValidationDirectivesComponent,
	PatternExpressionTemplateDrivenValidationDirectivesComponent,
	PatternMessageTemplateDrivenValidationDirectivesComponent,
	PatternConditionalExpressionTemplateDrivenValidationDirectivesComponent,
	PatternAddTemplateDrivenValidationDirectivesComponent,
  ],

})
export class  PatternTemplateDrivenValidationDirectivesExtendedModule { }
