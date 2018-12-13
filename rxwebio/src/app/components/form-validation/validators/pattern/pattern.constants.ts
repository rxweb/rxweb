import { PatternCompleteComponent } from "src/assets/examples/reactive-form-validators/decorators/pattern/complete/pattern-complete.component";
import { PatternCompleteTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/pattern/complete/pattern-complete.component";
import { PatternCompleteTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/pattern/complete/pattern-complete.component";
import { PatternCompleteValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/pattern/complete/pattern-complete.component";
import { PatternExpressionComponent } from "src/assets/examples/reactive-form-validators/decorators/pattern/expression/pattern-expression.component";
import { PatternExpressionTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/pattern/expression/pattern-expression.component";
import { PatternExpressionTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/pattern/expression/pattern-expression.component";
import { PatternExpressionValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/pattern/expression/pattern-expression.component";
import { PatternMessageComponent } from "src/assets/examples/reactive-form-validators/decorators/pattern/message/pattern-message.component";
import { PatternMessageTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/pattern/message/pattern-message.component";
import { PatternMessageTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/pattern/message/pattern-message.component";
import { PatternMessageValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/pattern/message/pattern-message.component";
import { PatternConditionalExpressionComponent } from "src/assets/examples/reactive-form-validators/decorators/pattern/conditionalExpression/pattern-conditional-expression.component";
import { PatternConditionalExpressionTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/pattern/conditionalExpression/pattern-conditional-expression.component";
import { PatternConditionalExpressionTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/pattern/conditionalExpression/pattern-conditional-expression.component";
import { PatternConditionalExpressionValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/pattern/conditionalExpression/pattern-conditional-expression.component";
import { PatternDynamicComponent } from "src/assets/examples/reactive-form-validators/decorators/pattern/dynamic/pattern-dynamic.component";
import { PatternDynamicValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/pattern/dynamic/pattern-dynamic.component";
import { PatternAddComponent } from "src/assets/examples/reactive-form-validators/decorators/pattern/add/pattern-add.component";
import { PatternAddTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/pattern/add/pattern-add.component";
import { PatternAddTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/pattern/add/pattern-add.component";
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
	template_driven_validation_directives:{
						complete : PatternCompleteTemplateDrivenValidationDirectivesComponent,
						expression : PatternExpressionTemplateDrivenValidationDirectivesComponent,
						message : PatternMessageTemplateDrivenValidationDirectivesComponent,
						conditionalExpression : PatternConditionalExpressionTemplateDrivenValidationDirectivesComponent,
						add : PatternAddTemplateDrivenValidationDirectivesComponent,
			  },
	template_driven_validation_decorators:{
						complete : PatternCompleteTemplateDrivenValidationDecoratorsComponent,
						expression : PatternExpressionTemplateDrivenValidationDecoratorsComponent,
						message : PatternMessageTemplateDrivenValidationDecoratorsComponent,
						conditionalExpression : PatternConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
						add : PatternAddTemplateDrivenValidationDecoratorsComponent,
			  },
}