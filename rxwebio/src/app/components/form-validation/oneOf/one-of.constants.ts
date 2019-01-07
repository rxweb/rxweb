import { OneOfAddComponent } from "src/assets/examples/reactive-form-validators/decorators/oneOf/add/one-of-add.component";
import { OneOfAddValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/oneOf/add/one-of-add.component";
import { OneOfDynamicComponent } from "src/assets/examples/reactive-form-validators/decorators/oneOf/dynamic/one-of-dynamic.component";
import { OneOfMessageComponent } from "src/assets/examples/reactive-form-validators/decorators/oneOf/message/one-of-message.component";
import { OneOfConditionalExpressionComponent } from "src/assets/examples/reactive-form-validators/decorators/oneOf/conditionalExpression/one-of-conditional-expression.component";
import { OneOfCompleteComponent } from "src/assets/examples/reactive-form-validators/decorators/oneOf/complete/one-of-complete.component";
import { OneOfMatchValuesComponent } from "src/assets/examples/reactive-form-validators/decorators/oneOf/matchValues/one-of-match-values.component";
import { OneOfCompleteValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/oneOf/complete/one-of-complete.component";
import { OneOfConditionalExpressionValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/oneOf/conditionalExpression/one-of-conditonal-expression.component";
import { OneOfMatchValuesValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/oneOf/matchValues/one-of-match-values.component";
import { OneOfMessageValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/oneOf/message/one-of-message.component";
import { OneOfDynamicValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/oneOf/dynamic/one-of-dynamic.component";

export const ONE_OF_COMPONENT_EXAMPLE_CONSTANT: { [key: string]: any } = {
	decorators:{
						complete : OneOfCompleteComponent,
						conditionalExpression : OneOfConditionalExpressionComponent,
						matchValues : OneOfMatchValuesComponent,
						message : OneOfMessageComponent,
						dynamic : OneOfDynamicComponent,
						add : OneOfAddComponent,
			  },
	template_driven_validation_directives:{
						// complete : OneOfCompleteTemplateDrivenValidationDirectivesComponent,
						// conditionalExpression : OneOfConditionalExpressionTemplateDrivenValidationDirectivesComponent,
						// matchValues : OneOfMatchValuesTemplateDrivenValidationDirectivesComponent,
						// message : OneOfMessageTemplateDrivenValidationDirectivesComponent,
						// add : OneOfAddTemplateDrivenValidationDirectivesComponent,
			  },
	template_driven_validation_decorators:{
						// complete : OneOfCompleteTemplateDrivenValidationDecoratorsComponent,
						// conditionalExpression : OneOfConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
						// matchValues : OneOfMatchValuesTemplateDrivenValidationDecoratorsComponent,
						// message : OneOfMessageTemplateDrivenValidationDecoratorsComponent,
						// add : OneOfAddTemplateDrivenValidationDecoratorsComponent,
			  },
	validators:{
						complete : OneOfCompleteValidatorComponent,
						conditionalExpression : OneOfConditionalExpressionValidatorComponent,
						matchValues : OneOfMatchValuesValidatorComponent,
						message : OneOfMessageValidatorComponent,
						dynamic : OneOfDynamicValidatorComponent,
						add : OneOfAddValidatorComponent,
			  },
}