import { DigitCompleteComponent } from "src/assets/examples/reactive-form-validators/decorators/digit/complete/digit-complete.component";
import { DigitCompleteTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/digit/complete/digit-complete.component";
import { DigitCompleteTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/digit/complete/digit-complete.component";
import { DigitCompleteValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/digit/complete/digit-complete.component";
import { DigitConditionalExpressionComponent } from "src/assets/examples/reactive-form-validators/decorators/digit/conditionalExpression/digit-conditional-expression.component";
import { DigitConditionalExpressionTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/digit/conditionalExpression/digit-conditional-expression.component";
import { DigitConditionalExpressionTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/digit/conditionalExpression/digit-conditional-expression.component";
import { DigitConditionalExpressionValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/digit/conditionalExpression/digit-conditional-expression.component";
import { DigitMessageComponent } from "src/assets/examples/reactive-form-validators/decorators/digit/message/digit-message.component";
import { DigitMessageTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/digit/message/digit-message.component";
import { DigitMessageTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/digit/message/digit-message.component";
import { DigitMessageValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/digit/message/digit-message.component";
import { DigitDynamicComponent } from "src/assets/examples/reactive-form-validators/decorators/digit/dynamic/digit-dynamic.component";
import { DigitDynamicValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/digit/dynamic/digit-dynamic.component";
import { DigitAddComponent } from "src/assets/examples/reactive-form-validators/decorators/digit/add/digit-add.component";
import { DigitAddTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/digit/add/digit-add.component";
import { DigitAddTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/digit/add/digit-add.component";
import { DigitAddValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/digit/add/digit-add.component";
import { DigitEditComponent } from "src/assets/examples/reactive-form-validators/decorators/digit/edit/digit-edit.component";

export const DIGIT_COMPONENT_EXAMPLE_CONSTANT: { [key: string]: any } = {
	decorators:{
						complete : DigitCompleteComponent,
						conditionalExpression : DigitConditionalExpressionComponent,
						message : DigitMessageComponent,
						dynamic : DigitDynamicComponent,
						add : DigitAddComponent,
						edit : DigitEditComponent,
			  },
	validators:{
						complete : DigitCompleteValidatorComponent,
						conditionalExpression : DigitConditionalExpressionValidatorComponent,
						message : DigitMessageValidatorComponent,
						dynamic : DigitDynamicValidatorComponent,
						add : DigitAddValidatorComponent,
			  },
	template_driven_validation_directives:{
						complete : DigitCompleteTemplateDrivenValidationDirectivesComponent,
						conditionalExpression : DigitConditionalExpressionTemplateDrivenValidationDirectivesComponent,
						message : DigitMessageTemplateDrivenValidationDirectivesComponent,
						add : DigitAddTemplateDrivenValidationDirectivesComponent,
			  },
	template_driven_validation_decorators:{
						complete : DigitCompleteTemplateDrivenValidationDecoratorsComponent,
						conditionalExpression : DigitConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
						message : DigitMessageTemplateDrivenValidationDecoratorsComponent,
						add : DigitAddTemplateDrivenValidationDecoratorsComponent,
			  },
}