import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { PatternCompleteTemplateDrivenValidationDecoratorsComponent } from './complete/pattern-complete.component';
import { PatternExpressionTemplateDrivenValidationDecoratorsComponent } from './expression/pattern-expression.component';
import { PatternMessageTemplateDrivenValidationDecoratorsComponent } from './message/pattern-message.component';
import { PatternConditionalExpressionTemplateDrivenValidationDecoratorsComponent } from './conditionalExpression/pattern-conditional-expression.component';
import { PatternAddTemplateDrivenValidationDecoratorsComponent } from './add/pattern-add.component';

@NgModule({
  declarations: [
	PatternCompleteTemplateDrivenValidationDecoratorsComponent,
	PatternExpressionTemplateDrivenValidationDecoratorsComponent,
	PatternMessageTemplateDrivenValidationDecoratorsComponent,
	PatternConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	PatternAddTemplateDrivenValidationDecoratorsComponent,
  ],
entryComponents: [
	PatternCompleteTemplateDrivenValidationDecoratorsComponent,
	PatternExpressionTemplateDrivenValidationDecoratorsComponent,
	PatternMessageTemplateDrivenValidationDecoratorsComponent,
	PatternConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	PatternAddTemplateDrivenValidationDecoratorsComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	PatternCompleteTemplateDrivenValidationDecoratorsComponent,
	PatternExpressionTemplateDrivenValidationDecoratorsComponent,
	PatternMessageTemplateDrivenValidationDecoratorsComponent,
	PatternConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	PatternAddTemplateDrivenValidationDecoratorsComponent,
  ],

})
export class  PatternTemplateDrivenValidationDecoratorsExtendedModule { }
