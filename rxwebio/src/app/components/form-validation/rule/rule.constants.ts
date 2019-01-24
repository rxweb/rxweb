import { RuleCompleteComponent } from "src/assets/examples/reactive-form-validators/decorators/rule/complete/rule-complete.component";
import { RuleCustomRulesComponent } from "src/assets/examples/reactive-form-validators/decorators/rule/customRules/rule-custom-rules.component";
import { RuleConditionalExpressionComponent } from "src/assets/examples/reactive-form-validators/decorators/rule/conditionalExpression/rule-conditional-expression.component";
import { RuleAddComponent } from "src/assets/examples/reactive-form-validators/decorators/rule/add/rule-add.component";

export const RULE_COMPONENT_EXAMPLE_CONSTANT: { [key: string]: any } = {
	decorators:{
						complete : RuleCompleteComponent,
						customRules : RuleCustomRulesComponent,
						conditionalExpression : RuleConditionalExpressionComponent,
						add : RuleAddComponent,
			  }
}