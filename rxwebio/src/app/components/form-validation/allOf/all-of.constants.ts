import { AllOfCompleteValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/allOf/complete/all-of-complete.component";
import { AllOfConditionalExpressionValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/allOf/conditionalExpression/all-of-conditonal-expression.component";
import { AllOfMatchValuesValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/allOf/matchValues/all-of-match-values.component";
import { AllOfMessageValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/allOf/message/all-of-message.component";
import { AllOfDynamicValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/allOf/dynamic/all-of-dynamic.component";
import { AllOfAddValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/allOf/add/all-of-add.component";
import { AllOfCompleteComponent } from "src/assets/examples/reactive-form-validators/decorators/allOf/complete/all-of-complete.component";
import { AllOfConditionalExpressionComponent } from "src/assets/examples/reactive-form-validators/decorators/allOf/conditionalExpression/all-of-conditional-expression.component";
import { AllOfMatchValuesComponent } from "src/assets/examples/reactive-form-validators/decorators/allOf/matchValues/all-of-match-values.component";
import { AllOfMessageComponent } from "src/assets/examples/reactive-form-validators/decorators/allOf/message/all-of-message.component";
import { AllOfDynamicComponent } from "src/assets/examples/reactive-form-validators/decorators/allOf/dynamic/all-of-dynamic.component";
import { AllOfAddComponent } from "src/assets/examples/reactive-form-validators/decorators/allOf/add/all-of-add.component";

export const ALL_OF_COMPONENT_EXAMPLE_CONSTANT: { [key: string]: any } = {
	decorators:{
						complete : AllOfCompleteComponent,
						conditionalExpression : AllOfConditionalExpressionComponent,
						matchValues : AllOfMatchValuesComponent,
						message : AllOfMessageComponent,
						dynamic : AllOfDynamicComponent,
						add : AllOfAddComponent,
			  },
	template_driven_validation_directives:{
						// complete : AllOfCompleteTemplateDrivenValidationDirectivesComponent,
						// conditionalExpression : AllOfConditionalExpressionTemplateDrivenValidationDirectivesComponent,
						// matchValues : AllOfMatchValuesTemplateDrivenValidationDirectivesComponent,
						// message : AllOfMessageTemplateDrivenValidationDirectivesComponent,
						// add : AllOfAddTemplateDrivenValidationDirectivesComponent,
			  },
	template_driven_validation_decorators:{
						// complete : AllOfCompleteTemplateDrivenValidationDecoratorsComponent,
						// conditionalExpression : AllOfConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
						// matchValues : AllOfMatchValuesTemplateDrivenValidationDecoratorsComponent,
						// message : AllOfMessageTemplateDrivenValidationDecoratorsComponent,
						// add : AllOfAddTemplateDrivenValidationDecoratorsComponent,
			  },
	validators:{
						complete : AllOfCompleteValidatorComponent,
						conditionalExpression : AllOfConditionalExpressionValidatorComponent,
						matchValues : AllOfMatchValuesValidatorComponent,
						message : AllOfMessageValidatorComponent,
						dynamic : AllOfDynamicValidatorComponent,
						add : AllOfAddValidatorComponent,
			  },
}