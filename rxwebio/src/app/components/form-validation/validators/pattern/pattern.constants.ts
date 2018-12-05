import { PatternCompleteComponent } from "src/assets/examples/reactive-form-validators/decorators/pattern/complete/pattern-complete.component";
import { PatternCompleteTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/pattern/complete/pattern-complete.component";
import { PatternCompleteValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/pattern/complete/pattern-complete.component";
import { PatternExpressionComponent } from "src/assets/examples/reactive-form-validators/decorators/pattern/expression/pattern-expression.component";
import { PatternExpressionTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/pattern/expression/pattern-expression.component";
import { PatternExpressionValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/pattern/expression/pattern-expression.component";
import { PatternMessageComponent } from "src/assets/examples/reactive-form-validators/decorators/pattern/message/pattern-message.component";
import { PatternMessageTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/pattern/message/pattern-message.component";
import { PatternMessageValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/pattern/message/pattern-message.component";
import { PatternConditionalExpressionComponent } from "src/assets/examples/reactive-form-validators/decorators/pattern/conditionalExpression/pattern-conditional-expression.component";
import { PatternConditionalExpressionTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/pattern/conditionalExpression/pattern-conditional-expression.component";
import { PatternConditionalExpressionValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/pattern/conditionalExpression/pattern-conditional-expression.component";
import { PatternDynamicComponent } from "src/assets/examples/reactive-form-validators/decorators/pattern/dynamic/pattern-dynamic.component";
import { PatternDynamicValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/pattern/dynamic/pattern-dynamic.component";
import { PatternAddComponent } from "src/assets/examples/reactive-form-validators/decorators/pattern/add/pattern-add.component";
import { PatternAddTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/pattern/add/pattern-add.component";
import { PatternAddValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/pattern/add/pattern-add.component";
import { PatternEditComponent } from "src/assets/examples/reactive-form-validators/decorators/pattern/edit/pattern-edit.component";

export const PATTERN_COMPONENT_EXAMPLE_CONSTANT: { [key: string]: any } = {
	decorators:{
						complete : PatternCompleteComponent,
						expression : PatternExpressionComponent,
						message : PatternMessageComponent,
						conditionalExpression : PatternConditionalExpressionComponent,
						dynamic : PatternDynamicComponent,
						add : PatternAddComponent,
						edit : PatternEditComponent,
			  },
	validators:{
						complete : PatternCompleteValidatorComponent,
						expression : PatternExpressionValidatorComponent,
						message : PatternMessageValidatorComponent,
						conditionalExpression : PatternConditionalExpressionValidatorComponent,
						dynamic : PatternDynamicValidatorComponent,
						add : PatternAddValidatorComponent,
			  },
	template_driven:{
						complete : PatternCompleteTemplateDrivenComponent,
						expression : PatternExpressionTemplateDrivenComponent,
						message : PatternMessageTemplateDrivenComponent,
						conditionalExpression : PatternConditionalExpressionTemplateDrivenComponent,
						add : PatternAddTemplateDrivenComponent,
			  },
}