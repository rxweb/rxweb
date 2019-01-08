import { RequiredCompleteComponent } from "src/assets/examples/reactive-form-validators/decorators/required/complete/required-complete.component";
import { RequiredCompleteTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/required/complete/required-complete.component";
import { RequiredCompleteTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/required/complete/required-complete.component";
import { RequiredCompleteValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/required/complete/required-complete.component";
import { RequiredConditionalExpressionComponent } from "src/assets/examples/reactive-form-validators/decorators/required/conditionalExpression/required-conditional-expression.component";
import { RequiredConditionalExpressionTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/required/conditionalExpression/required-conditional-expression.component";
import { RequiredConditionalExpressionTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/required/conditionalExpression/required-conditional-expression.component";
import { RequiredConditionalExpressionValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/required/conditionalExpression/required-conditional-expression.component";
import { RequiredMessageComponent } from "src/assets/examples/reactive-form-validators/decorators/required/message/required-message.component";
import { RequiredMessageTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/required/message/required-message.component";
import { RequiredMessageTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/required/message/required-message.component";
import { RequiredMessageValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/required/message/required-message.component";
import { RequiredDynamicComponent } from "src/assets/examples/reactive-form-validators/decorators/required/dynamic/required-dynamic.component";
import { RequiredDynamicValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/required/dynamic/required-dynamic.component";
import { RequiredAddComponent } from "src/assets/examples/reactive-form-validators/decorators/required/add/required-add.component";
import { RequiredAddTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/required/add/required-add.component";
import { RequiredAddTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/required/add/required-add.component";
import { RequiredAddValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/required/add/required-add.component";
import { RequiredEditComponent } from "src/assets/examples/reactive-form-validators/decorators/required/edit/required-edit.component";

export const REQUIRED_COMPONENT_EXAMPLE_CONSTANT: { [key: string]: any } = {
	decorators:{
						complete : RequiredCompleteComponent,
						conditionalExpression : RequiredConditionalExpressionComponent,
						message : RequiredMessageComponent,
						dynamic : RequiredDynamicComponent,
						add : RequiredAddComponent,
						edit : RequiredEditComponent,
			  },
	template_driven_validation_directives:{
						complete : RequiredCompleteTemplateDrivenValidationDirectivesComponent,
						conditionalExpression : RequiredConditionalExpressionTemplateDrivenValidationDirectivesComponent,
						message : RequiredMessageTemplateDrivenValidationDirectivesComponent,
						add : RequiredAddTemplateDrivenValidationDirectivesComponent,
			  },
	template_driven_validation_decorators:{
						complete : RequiredCompleteTemplateDrivenValidationDecoratorsComponent,
						conditionalExpression : RequiredConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
						message : RequiredMessageTemplateDrivenValidationDecoratorsComponent,
						add : RequiredAddTemplateDrivenValidationDecoratorsComponent,
			  },
	validators:{
						complete : RequiredCompleteValidatorComponent,
						conditionalExpression : RequiredConditionalExpressionValidatorComponent,
						message : RequiredMessageValidatorComponent,
						dynamic : RequiredDynamicValidatorComponent,
						add : RequiredAddValidatorComponent,
			  },
}