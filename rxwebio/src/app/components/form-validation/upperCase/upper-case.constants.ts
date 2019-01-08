import { UpperCaseCompleteComponent } from "src/assets/examples/reactive-form-validators/decorators/upperCase/complete/upper-case-complete.component";
import { UpperCaseCompleteTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/upperCase/complete/upper-case-complete.component";
import { UpperCaseCompleteTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/upperCase/complete/upper-case-complete.component";
import { UpperCaseCompleteValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/upperCase/complete/upper-case-complete.component";
import { UpperCaseConditionalExpressionComponent } from "src/assets/examples/reactive-form-validators/decorators/upperCase/conditionalExpression/upper-case-conditional-expression.component";
import { UpperCaseConditionalExpressionTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/upperCase/conditionalExpression/upper-case-conditional-expression.component";
import { UpperCaseConditionalExpressionTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/upperCase/conditionalExpression/upper-case-conditional-expression.component";
import { UpperCaseConditionalExpressionValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/upperCase/conditionalExpression/upper-case-conditional-expression.component";
import { UpperCaseMessageComponent } from "src/assets/examples/reactive-form-validators/decorators/upperCase/message/upper-case-message.component";
import { UpperCaseMessageTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/upperCase/message/upper-case-message.component";
import { UpperCaseMessageTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/upperCase/message/upper-case-message.component";
import { UpperCaseMessageValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/upperCase/message/upper-case-message.component";
import { UpperCaseDynamicComponent } from "src/assets/examples/reactive-form-validators/decorators/upperCase/dynamic/upper-case-dynamic.component";
import { UpperCaseDynamicValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/upperCase/dynamic/upper-case-dynamic.component";
import { UpperCaseAddComponent } from "src/assets/examples/reactive-form-validators/decorators/upperCase/add/upper-case-add.component";
import { UpperCaseAddTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/upperCase/add/upper-case-add.component";
import { UpperCaseAddTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/upperCase/add/upper-case-add.component";
import { UpperCaseAddValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/upperCase/add/upper-case-add.component";
import { UpperCaseEditComponent } from "src/assets/examples/reactive-form-validators/decorators/upperCase/edit/upper-case-edit.component";

export const UPPER_CASE_COMPONENT_EXAMPLE_CONSTANT: { [key: string]: any } = {
	decorators:{
						complete : UpperCaseCompleteComponent,
						conditionalExpression : UpperCaseConditionalExpressionComponent,
						message : UpperCaseMessageComponent,
						dynamic : UpperCaseDynamicComponent,
						add : UpperCaseAddComponent,
						edit : UpperCaseEditComponent,
			  },
	template_driven_validation_directives:{
						complete : UpperCaseCompleteTemplateDrivenValidationDirectivesComponent,
						conditionalExpression : UpperCaseConditionalExpressionTemplateDrivenValidationDirectivesComponent,
						message : UpperCaseMessageTemplateDrivenValidationDirectivesComponent,
						add : UpperCaseAddTemplateDrivenValidationDirectivesComponent,
			  },
	template_driven_validation_decorators:{
						complete : UpperCaseCompleteTemplateDrivenValidationDecoratorsComponent,
						conditionalExpression : UpperCaseConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
						message : UpperCaseMessageTemplateDrivenValidationDecoratorsComponent,
						add : UpperCaseAddTemplateDrivenValidationDecoratorsComponent,
			  },
	validators:{
						complete : UpperCaseCompleteValidatorComponent,
						conditionalExpression : UpperCaseConditionalExpressionValidatorComponent,
						message : UpperCaseMessageValidatorComponent,
						dynamic : UpperCaseDynamicValidatorComponent,
						add : UpperCaseAddValidatorComponent,
			  },
}