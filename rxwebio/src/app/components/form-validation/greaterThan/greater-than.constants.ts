import { GreaterThanCompleteComponent } from "src/assets/examples/reactive-form-validators/decorators/greaterThan/complete/greater-than-complete.component";
import { GreaterThanCompleteTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/greaterThan/complete/greater-than-complete.component";
import { GreaterThanCompleteTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/greaterThan/complete/greater-than-complete.component";
import { GreaterThanCompleteValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/greaterThan/complete/greater-than-complete.component";
import { GreaterThanFieldNameComponent } from "src/assets/examples/reactive-form-validators/decorators/greaterThan/fieldName/greater-than-field-name.component";
import { GreaterThanFieldNameTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/greaterThan/fieldName/greater-than-field-name.component";
import { GreaterThanFieldNameTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/greaterThan/fieldName/greater-than-field-name.component";
import { GreaterThanFieldNameValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/greaterThan/fieldName/greater-than-field-name.component";
import { GreaterThanConditionalExpressionComponent } from "src/assets/examples/reactive-form-validators/decorators/greaterThan/conditionalExpression/greater-than-conditional-expression.component";
import { GreaterThanConditionalExpressionTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/greaterThan/conditionalExpression/greater-than-conditional-expression.component";
import { GreaterThanConditionalExpressionTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/greaterThan/conditionalExpression/greater-than-conditional-expression.component";
import { GreaterThanConditionalExpressionValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/greaterThan/conditionalExpression/greater-than-conditional-expression.component";
import { GreaterThanMessageComponent } from "src/assets/examples/reactive-form-validators/decorators/greaterThan/message/greater-than-message.component";
import { GreaterThanMessageTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/greaterThan/message/greater-than-message.component";
import { GreaterThanMessageTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/greaterThan/message/greater-than-message.component";
import { GreaterThanMessageValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/greaterThan/message/greater-than-message.component";
import { GreaterThanDynamicComponent } from "src/assets/examples/reactive-form-validators/decorators/greaterThan/dynamic/greater-than-dynamic.component";
import { GreaterThanDynamicValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/greaterThan/dynamic/greater-than-dynamic.component";
import { GreaterThanAddComponent } from "src/assets/examples/reactive-form-validators/decorators/greaterThan/add/greater-than-add.component";
import { GreaterThanAddTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/greaterThan/add/greater-than-add.component";
import { GreaterThanAddTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/greaterThan/add/greater-than-add.component";
import { GreaterThanAddValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/greaterThan/add/greater-than-add.component";
import { GreaterThanEditComponent } from "src/assets/examples/reactive-form-validators/decorators/greaterThan/edit/greater-than-edit.component";

export const GREATER_THAN_COMPONENT_EXAMPLE_CONSTANT: { [key: string]: any } = {
	decorators:{
						complete : GreaterThanCompleteComponent,
						fieldName : GreaterThanFieldNameComponent,
						conditionalExpression : GreaterThanConditionalExpressionComponent,
						message : GreaterThanMessageComponent,
						dynamic : GreaterThanDynamicComponent,
						add : GreaterThanAddComponent,
						edit : GreaterThanEditComponent,
			  },
	template_driven_validation_directives:{
						complete : GreaterThanCompleteTemplateDrivenValidationDirectivesComponent,
						fieldName : GreaterThanFieldNameTemplateDrivenValidationDirectivesComponent,
						conditionalExpression : GreaterThanConditionalExpressionTemplateDrivenValidationDirectivesComponent,
						message : GreaterThanMessageTemplateDrivenValidationDirectivesComponent,
						add : GreaterThanAddTemplateDrivenValidationDirectivesComponent,
			  },
	template_driven_validation_decorators:{
						complete : GreaterThanCompleteTemplateDrivenValidationDecoratorsComponent,
						fieldName : GreaterThanFieldNameTemplateDrivenValidationDecoratorsComponent,
						conditionalExpression : GreaterThanConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
						message : GreaterThanMessageTemplateDrivenValidationDecoratorsComponent,
						add : GreaterThanAddTemplateDrivenValidationDecoratorsComponent,
			  },
	validators:{
						complete : GreaterThanCompleteValidatorComponent,
						fieldName : GreaterThanFieldNameValidatorComponent,
						conditionalExpression : GreaterThanConditionalExpressionValidatorComponent,
						message : GreaterThanMessageValidatorComponent,
						dynamic : GreaterThanDynamicValidatorComponent,
						add : GreaterThanAddValidatorComponent,
			  },
}