import { ChoiceAddValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/choice/add/choice-add.component";
import { ChoiceCompleteValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/choice/complete/choice-complete.component";
import { ChoiceCompleteComponent } from "src/assets/examples/reactive-form-validators/decorators/choice/complete/choice-complete.component";
import { ChoiceMessageComponent } from "src/assets/examples/reactive-form-validators/decorators/choice/message/choice-message.component";
import { ChoiceMinLengthComponent } from "src/assets/examples/reactive-form-validators/decorators/choice/minLength/choice-min-length.component";
import { ChoiceConditionalExpressionComponent } from "src/assets/examples/reactive-form-validators/decorators/choice/conditionalExpression/choice-conditional-expression.component";
import { ChoiceDynamicComponent } from "src/assets/examples/reactive-form-validators/decorators/choice/dynamic/choice-dynamic.component";
import { ChoiceAddComponent } from "src/assets/examples/reactive-form-validators/decorators/choice/add/choice-add.component";
import { ChoiceCompleteTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/choice/complete/choice-complete.component";
import { ChoiceMinLengthTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/choice/minLength/choice-min-length.component";
import { ChoiceMessageTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/choice/message/choice-message.component";
import { ChoiceConditionalExpressionTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/choice/conditionalExpression/choice-conditional-expression.component";
import { ChoiceDynamicTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/choice/dynamic/choice-dynamic.component";
import { ChoiceAddTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/choice/add/choice-add.component";
import { ChoiceMinLengthValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/choice/minLength/choice-min-length.component";
import { ChoiceMessageValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/choice/message/choice-message.component";
import { ChoiceConditionalExpressionValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/choice/conditionalExpression/choice-conditonal-expression.component";
import { ChoiceDynamicValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/choice/dynamic/choice-dynamic.component";
import { ChoiceMaxLengthComponent } from "src/assets/examples/reactive-form-validators/decorators/choice/maxLength/choice-max-length.component";
import { ChoiceMaxLengthTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/choice/maxLength/choice-max-length.component";
import { ChoiceMaxLengthValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/choice/maxLength/choice-max-length.component";

export const CHOICE_COMPONENT_EXAMPLE_CONSTANT: { [key: string]: any } = {
	decorators: {
		complete: ChoiceCompleteComponent,
		minLength: ChoiceMinLengthComponent,
		maxLength: ChoiceMaxLengthComponent,
		message: ChoiceMessageComponent,
		conditionalExpression: ChoiceConditionalExpressionComponent,
		dynamic: ChoiceDynamicComponent,
		add: ChoiceAddComponent,
	},
	template_driven_validation_directives: {
		complete: ChoiceCompleteTemplateDrivenValidationDirectivesComponent,
		maxLength: ChoiceMaxLengthTemplateDrivenValidationDirectivesComponent,
		minLength: ChoiceMinLengthTemplateDrivenValidationDirectivesComponent,
		message: ChoiceMessageTemplateDrivenValidationDirectivesComponent,
		conditionalExpression: ChoiceConditionalExpressionTemplateDrivenValidationDirectivesComponent,
		dynamic: ChoiceDynamicTemplateDrivenValidationDirectivesComponent,
		add: ChoiceAddTemplateDrivenValidationDirectivesComponent,
	},
	template_driven_validation_decorators: {
	},
	validators: {
		complete: ChoiceCompleteValidatorComponent,
		minLength: ChoiceMinLengthValidatorComponent,
		maxLength: ChoiceMaxLengthValidatorComponent,
		message: ChoiceMessageValidatorComponent,
		conditionalExpression: ChoiceConditionalExpressionValidatorComponent,
		dynamic: ChoiceDynamicValidatorComponent,
		add: ChoiceAddValidatorComponent,
	},
}