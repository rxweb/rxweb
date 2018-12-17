import { StartsWithCompleteComponent } from "src/assets/examples/reactive-form-validators/decorators/startsWith/complete/starts-with-complete.component";
import { StartsWithCompleteTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/startsWith/complete/starts-with-complete.component";
import { StartsWithCompleteTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/startsWith/complete/starts-with-complete.component";
import { StartsWithCompleteValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/startsWith/complete/starts-with-complete.component";
import { StartsWithValueComponent } from "src/assets/examples/reactive-form-validators/decorators/startsWith/value/starts-with-value.component";
import { StartsWithValueTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/startsWith/value/starts-with-value.component";
import { StartsWithValueTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/startsWith/value/starts-with-value.component";
import { StartsWithValueValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/startsWith/value/starts-with-value.component";
import { StartsWithConditionalExpressionComponent } from "src/assets/examples/reactive-form-validators/decorators/startsWith/conditionalExpression/starts-with-conditional-expression.component";
import { StartsWithConditionalExpressionTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/startsWith/conditionalExpression/starts-with-conditional-expression.component";
import { StartsWithConditionalExpressionTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/startsWith/conditionalExpression/starts-with-conditional-expression.component";
import { StartsWithConditionalExpressionValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/startsWith/conditionalExpression/starts-with-conditional-expression.component";
import { StartsWithMessageComponent } from "src/assets/examples/reactive-form-validators/decorators/startsWith/message/starts-with-message.component";
import { StartsWithMessageTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/startsWith/message/starts-with-message.component";
import { StartsWithMessageTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/startsWith/message/starts-with-message.component";
import { StartsWithMessageValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/startsWith/message/starts-with-message.component";
import { StartsWithDynamicComponent } from "src/assets/examples/reactive-form-validators/decorators/startsWith/dynamic/starts-with-dynamic.component";
import { StartsWithDynamicValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/startsWith/dynamic/starts-with-dynamic.component";
import { StartsWithAddComponent } from "src/assets/examples/reactive-form-validators/decorators/startsWith/add/starts-with-add.component";
import { StartsWithAddTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/startsWith/add/starts-with-add.component";
import { StartsWithAddTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/startsWith/add/starts-with-add.component";
import { StartsWithAddValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/startsWith/add/starts-with-add.component";
import { StartsWithEditComponent } from "src/assets/examples/reactive-form-validators/decorators/startsWith/edit/starts-with-edit.component";

export const STARTS_WITH_COMPONENT_EXAMPLE_CONSTANT: { [key: string]: any } = {
	decorators:{
						complete : StartsWithCompleteComponent,
						value : StartsWithValueComponent,
						conditionalExpression : StartsWithConditionalExpressionComponent,
						message : StartsWithMessageComponent,
						dynamic : StartsWithDynamicComponent,
						add : StartsWithAddComponent,
						edit : StartsWithEditComponent,
			  },
	validators:{
						complete : StartsWithCompleteValidatorComponent,
						value : StartsWithValueValidatorComponent,
						conditionalExpression : StartsWithConditionalExpressionValidatorComponent,
						message : StartsWithMessageValidatorComponent,
						dynamic : StartsWithDynamicValidatorComponent,
						add : StartsWithAddValidatorComponent,
			  },
	template_driven_validation_directives:{
						complete : StartsWithCompleteTemplateDrivenValidationDirectivesComponent,
						value : StartsWithValueTemplateDrivenValidationDirectivesComponent,
						conditionalExpression : StartsWithConditionalExpressionTemplateDrivenValidationDirectivesComponent,
						message : StartsWithMessageTemplateDrivenValidationDirectivesComponent,
						add : StartsWithAddTemplateDrivenValidationDirectivesComponent,
			  },
	template_driven_validation_decorators:{
						complete : StartsWithCompleteTemplateDrivenValidationDecoratorsComponent,
						value : StartsWithValueTemplateDrivenValidationDecoratorsComponent,
						conditionalExpression : StartsWithConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
						message : StartsWithMessageTemplateDrivenValidationDecoratorsComponent,
						add : StartsWithAddTemplateDrivenValidationDecoratorsComponent,
			  },
}