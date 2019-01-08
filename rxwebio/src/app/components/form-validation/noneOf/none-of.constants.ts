import { NoneOfCompleteComponent } from "src/assets/examples/reactive-form-validators/decorators/noneOf/complete/none-of-complete.component";
import { NoneOfConditionalExpressionComponent } from "src/assets/examples/reactive-form-validators/decorators/noneOf/conditionalExpression/none-of-conditional-expression.component";
import { NoneOfMatchValuesComponent } from "src/assets/examples/reactive-form-validators/decorators/noneOf/matchValues/none-of-match-values.component";
import { NoneOfMessageComponent } from "src/assets/examples/reactive-form-validators/decorators/noneOf/message/none-of-message.component";
import { NoneOfDynamicComponent } from "src/assets/examples/reactive-form-validators/decorators/noneOf/dynamic/none-of-dynamic.component";
import { NoneOfAddComponent } from "src/assets/examples/reactive-form-validators/decorators/noneOf/add/none-of-add.component";
import { NoneOfAddValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/noneOf/add/none-of-add.component";
import { NoneOfDynamicValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/noneOf/dynamic/none-of-dynamic.component";
import { NoneOfMessageValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/noneOf/message/none-of-message.component";
import { NoneOfMatchValuesValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/noneOf/matchValues/none-of-match-values.component";
import { NoneOfCompleteValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/noneOf/complete/none-of-complete.component";
import { NoneOfConditionalExpressionValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/noneOf/conditionalExpression/none-of-conditional-expression.component";

export const NONE_OF_COMPONENT_EXAMPLE_CONSTANT: { [key: string]: any } = {
	decorators:{
						complete : NoneOfCompleteComponent,
						conditionalExpression : NoneOfConditionalExpressionComponent,
						matchValues : NoneOfMatchValuesComponent,
						message : NoneOfMessageComponent,
						dynamic : NoneOfDynamicComponent,
						add : NoneOfAddComponent,
			  },
	template_driven_validation_directives:{
						// complete : NoneOfCompleteTemplateDrivenValidationDirectivesComponent,
						// conditionalExpression : NoneOfConditionalExpressionTemplateDrivenValidationDirectivesComponent,
						// matchValues : NoneOfMatchValuesTemplateDrivenValidationDirectivesComponent,
						// message : NoneOfMessageTemplateDrivenValidationDirectivesComponent,
						// add : NoneOfAddTemplateDrivenValidationDirectivesComponent,
			  },
	template_driven_validation_decorators:{
						// complete : NoneOfCompleteTemplateDrivenValidationDecoratorsComponent,
						// conditionalExpression : NoneOfConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
						// matchValues : NoneOfMatchValuesTemplateDrivenValidationDecoratorsComponent,
						// message : NoneOfMessageTemplateDrivenValidationDecoratorsComponent,
						// add : NoneOfAddTemplateDrivenValidationDecoratorsComponent,
			  },
	validators:{
						complete : NoneOfCompleteValidatorComponent,
						conditionalExpression : NoneOfConditionalExpressionValidatorComponent,
						matchValues : NoneOfMatchValuesValidatorComponent,
						message : NoneOfMessageValidatorComponent,
						dynamic : NoneOfDynamicValidatorComponent,
						add : NoneOfAddValidatorComponent,
			  },
}