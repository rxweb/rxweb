import { LessThanCompleteComponent } from "src/assets/examples/reactive-form-validators/decorators/lessThan/complete/less-than-complete.component";
import { LessThanCompleteTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/lessThan/complete/less-than-complete.component";
import { LessThanCompleteTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/lessThan/complete/less-than-complete.component";
import { LessThanCompleteValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/lessThan/complete/less-than-complete.component";
import { LessThanFieldNameComponent } from "src/assets/examples/reactive-form-validators/decorators/lessThan/fieldName/less-than-field-name.component";
import { LessThanFieldNameTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/lessThan/fieldName/less-than-field-name.component";
import { LessThanFieldNameTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/lessThan/fieldName/less-than-field-name.component";
import { LessThanFieldNameValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/lessThan/fieldName/less-than-field-name.component";
import { LessThanConditionalExpressionComponent } from "src/assets/examples/reactive-form-validators/decorators/lessThan/conditionalExpression/less-than-conditional-expression.component";
import { LessThanConditionalExpressionTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/lessThan/conditionalExpression/less-than-conditional-expression.component";
import { LessThanConditionalExpressionTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/lessThan/conditionalExpression/less-than-conditional-expression.component";
import { LessThanConditionalExpressionValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/lessThan/conditionalExpression/less-than-conditional-expression.component";
import { LessThanMessageComponent } from "src/assets/examples/reactive-form-validators/decorators/lessThan/message/less-than-message.component";
import { LessThanMessageTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/lessThan/message/less-than-message.component";
import { LessThanMessageTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/lessThan/message/less-than-message.component";
import { LessThanMessageValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/lessThan/message/less-than-message.component";
import { LessThanDynamicComponent } from "src/assets/examples/reactive-form-validators/decorators/lessThan/dynamic/less-than-dynamic.component";
import { LessThanDynamicValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/lessThan/dynamic/less-than-dynamic.component";
import { LessThanAddComponent } from "src/assets/examples/reactive-form-validators/decorators/lessThan/add/less-than-add.component";
import { LessThanAddTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/lessThan/add/less-than-add.component";
import { LessThanAddTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/lessThan/add/less-than-add.component";
import { LessThanAddValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/lessThan/add/less-than-add.component";
import { LessThanEditComponent } from "src/assets/examples/reactive-form-validators/decorators/lessThan/edit/less-than-edit.component";

export const LESS_THAN_COMPONENT_EXAMPLE_CONSTANT: { [key: string]: any } = {
	decorators:{
						complete : LessThanCompleteComponent,
						fieldName : LessThanFieldNameComponent,
						conditionalExpression : LessThanConditionalExpressionComponent,
						message : LessThanMessageComponent,
						dynamic : LessThanDynamicComponent,
						add : LessThanAddComponent,
						edit : LessThanEditComponent,
			  },
	template_driven_validation_directives:{
						complete : LessThanCompleteTemplateDrivenValidationDirectivesComponent,
						fieldName : LessThanFieldNameTemplateDrivenValidationDirectivesComponent,
						conditionalExpression : LessThanConditionalExpressionTemplateDrivenValidationDirectivesComponent,
						message : LessThanMessageTemplateDrivenValidationDirectivesComponent,
						add : LessThanAddTemplateDrivenValidationDirectivesComponent,
			  },
	template_driven_validation_decorators:{
						complete : LessThanCompleteTemplateDrivenValidationDecoratorsComponent,
						fieldName : LessThanFieldNameTemplateDrivenValidationDecoratorsComponent,
						conditionalExpression : LessThanConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
						message : LessThanMessageTemplateDrivenValidationDecoratorsComponent,
						add : LessThanAddTemplateDrivenValidationDecoratorsComponent,
			  },
	validators:{
						complete : LessThanCompleteValidatorComponent,
						fieldName : LessThanFieldNameValidatorComponent,
						conditionalExpression : LessThanConditionalExpressionValidatorComponent,
						message : LessThanMessageValidatorComponent,
						dynamic : LessThanDynamicValidatorComponent,
						add : LessThanAddValidatorComponent,
			  },
}