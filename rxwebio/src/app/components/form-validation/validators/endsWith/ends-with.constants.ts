import { EndsWithCompleteComponent } from "src/assets/examples/reactive-form-validators/decorators/endsWith/complete/ends-with-complete.component";
import { EndsWithCompleteTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/endsWith/complete/ends-with-complete.component";
import { EndsWithCompleteTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/endsWith/complete/ends-with-complete.component";
import { EndsWithCompleteValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/endsWith/complete/ends-with-complete.component";
import { EndsWithValueComponent } from "src/assets/examples/reactive-form-validators/decorators/endsWith/value/ends-with-value.component";
import { EndsWithValueTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/endsWith/value/ends-with-value.component";
import { EndsWithValueTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/endsWith/value/ends-with-value.component";
import { EndsWithValueValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/endsWith/value/ends-with-value.component";
import { EndsWithConditionalExpressionComponent } from "src/assets/examples/reactive-form-validators/decorators/endsWith/conditionalExpression/ends-with-conditional-expression.component";
import { EndsWithConditionalExpressionTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/endsWith/conditionalExpression/ends-with-conditional-expression.component";
import { EndsWithConditionalExpressionTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/endsWith/conditionalExpression/ends-with-conditional-expression.component";
import { EndsWithConditionalExpressionValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/endsWith/conditionalExpression/ends-with-conditional-expression.component";
import { EndsWithMessageComponent } from "src/assets/examples/reactive-form-validators/decorators/endsWith/message/ends-with-message.component";
import { EndsWithMessageTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/endsWith/message/ends-with-message.component";
import { EndsWithMessageTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/endsWith/message/ends-with-message.component";
import { EndsWithMessageValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/endsWith/message/ends-with-message.component";
import { EndsWithDynamicComponent } from "src/assets/examples/reactive-form-validators/decorators/endsWith/dynamic/ends-with-dynamic.component";
import { EndsWithDynamicValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/endsWith/dynamic/ends-with-dynamic.component";
import { EndsWithAddComponent } from "src/assets/examples/reactive-form-validators/decorators/endsWith/add/ends-with-add.component";
import { EndsWithAddTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/endsWith/add/ends-with-add.component";
import { EndsWithAddTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/endsWith/add/ends-with-add.component";
import { EndsWithAddValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/endsWith/add/ends-with-add.component";
import { EndsWithEditComponent } from "src/assets/examples/reactive-form-validators/decorators/endsWith/edit/ends-with-edit.component";

export const ENDS_WITH_COMPONENT_EXAMPLE_CONSTANT: { [key: string]: any } = {
	decorators:{
						complete : EndsWithCompleteComponent,
						value : EndsWithValueComponent,
						conditionalExpression : EndsWithConditionalExpressionComponent,
						message : EndsWithMessageComponent,
						dynamic : EndsWithDynamicComponent,
						add : EndsWithAddComponent,
						edit : EndsWithEditComponent,
			  },
	validators:{
						complete : EndsWithCompleteValidatorComponent,
						value : EndsWithValueValidatorComponent,
						conditionalExpression : EndsWithConditionalExpressionValidatorComponent,
						message : EndsWithMessageValidatorComponent,
						dynamic : EndsWithDynamicValidatorComponent,
						add : EndsWithAddValidatorComponent,
			  },
	template_driven_validation_directives:{
						complete : EndsWithCompleteTemplateDrivenValidationDirectivesComponent,
						value : EndsWithValueTemplateDrivenValidationDirectivesComponent,
						conditionalExpression : EndsWithConditionalExpressionTemplateDrivenValidationDirectivesComponent,
						message : EndsWithMessageTemplateDrivenValidationDirectivesComponent,
						add : EndsWithAddTemplateDrivenValidationDirectivesComponent,
			  },
	template_driven_validation_decorators:{
						complete : EndsWithCompleteTemplateDrivenValidationDecoratorsComponent,
						value : EndsWithValueTemplateDrivenValidationDecoratorsComponent,
						conditionalExpression : EndsWithConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
						message : EndsWithMessageTemplateDrivenValidationDecoratorsComponent,
						add : EndsWithAddTemplateDrivenValidationDecoratorsComponent,
			  },
}