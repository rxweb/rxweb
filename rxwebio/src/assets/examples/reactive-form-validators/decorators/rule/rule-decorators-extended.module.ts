import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { RuleCompleteComponent } from './complete/rule-complete.component';
import { RuleCustomRulesComponent } from './customRules/rule-custom-rules.component';
import { RuleConditionalExpressionComponent } from './conditionalExpression/rule-conditional-expression.component';
import { RuleAddComponent } from './add/rule-add.component';

@NgModule({
  declarations: [
	RuleCompleteComponent,
	RuleCustomRulesComponent,
	RuleConditionalExpressionComponent,
	RuleAddComponent,
  ],
entryComponents: [
	RuleCompleteComponent,
	RuleCustomRulesComponent,
	RuleConditionalExpressionComponent,
	RuleAddComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	RuleCompleteComponent,
	RuleCustomRulesComponent,
	RuleConditionalExpressionComponent,
	RuleAddComponent,
  ],

})
export class  RuleDecoratorsExtendedModule { }
