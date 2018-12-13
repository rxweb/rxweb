import { MinNumberCompleteComponent } from "src/assets/examples/reactive-form-validators/decorators/minNumber/complete/min-number-complete.component";
import { MinNumberCompleteTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/minNumber/complete/min-number-complete.component";
import { MinNumberCompleteTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/minNumber/complete/min-number-complete.component";
import { MinNumberCompleteValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/minNumber/complete/min-number-complete.component";
import { MinNumberValueComponent } from "src/assets/examples/reactive-form-validators/decorators/minNumber/value/min-number-value.component";
import { MinNumberValueTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/minNumber/value/min-number-value.component";
import { MinNumberValueTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/minNumber/value/min-number-value.component";
import { MinNumberValueValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/minNumber/value/min-number-value.component";
import { MinNumberMessageComponent } from "src/assets/examples/reactive-form-validators/decorators/minNumber/message/min-number-message.component";
import { MinNumberMessageTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/minNumber/message/min-number-message.component";
import { MinNumberMessageTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/minNumber/message/min-number-message.component";
import { MinNumberMessageValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/minNumber/message/min-number-message.component";
import { MinNumberConditionalExpressionComponent } from "src/assets/examples/reactive-form-validators/decorators/minNumber/conditionalExpression/min-number-conditional-expression.component";
import { MinNumberConditionalExpressionTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/minNumber/conditionalExpression/min-number-conditional-expression.component";
import { MinNumberConditionalExpressionTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/minNumber/conditionalExpression/min-number-conditional-expression.component";
import { MinNumberConditionalExpressionValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/minNumber/conditionalExpression/min-number-conditional-expression.component";
import { MinNumberDynamicComponent } from "src/assets/examples/reactive-form-validators/decorators/minNumber/dynamic/min-number-dynamic.component";
import { MinNumberDynamicValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/minNumber/dynamic/min-number-dynamic.component";
import { MinNumberAddComponent } from "src/assets/examples/reactive-form-validators/decorators/minNumber/add/min-number-add.component";
import { MinNumberAddTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/minNumber/add/min-number-add.component";
import { MinNumberAddTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/minNumber/add/min-number-add.component";
import { MinNumberAddValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/minNumber/add/min-number-add.component";
import { MinNumberEditComponent } from "src/assets/examples/reactive-form-validators/decorators/minNumber/edit/min-number-edit.component";

export const MIN_NUMBER_COMPONENT_EXAMPLE_CONSTANT: { [key: string]: any } = {
	decorators:{
						complete : MinNumberCompleteComponent,
						value : MinNumberValueComponent,
						message : MinNumberMessageComponent,
						conditionalExpression : MinNumberConditionalExpressionComponent,
						dynamic : MinNumberDynamicComponent,
						add : MinNumberAddComponent,
						edit : MinNumberEditComponent,
			  },
	validators:{
						complete : MinNumberCompleteValidatorComponent,
						value : MinNumberValueValidatorComponent,
						message : MinNumberMessageValidatorComponent,
						conditionalExpression : MinNumberConditionalExpressionValidatorComponent,
						dynamic : MinNumberDynamicValidatorComponent,
						add : MinNumberAddValidatorComponent,
			  },
	template_driven_validation_directives:{
						complete : MinNumberCompleteTemplateDrivenValidationDirectivesComponent,
						value : MinNumberValueTemplateDrivenValidationDirectivesComponent,
						message : MinNumberMessageTemplateDrivenValidationDirectivesComponent,
						conditionalExpression : MinNumberConditionalExpressionTemplateDrivenValidationDirectivesComponent,
						add : MinNumberAddTemplateDrivenValidationDirectivesComponent,
			  },
	template_driven_validation_decorators:{
						complete : MinNumberCompleteTemplateDrivenValidationDecoratorsComponent,
						value : MinNumberValueTemplateDrivenValidationDecoratorsComponent,
						message : MinNumberMessageTemplateDrivenValidationDecoratorsComponent,
						conditionalExpression : MinNumberConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
						add : MinNumberAddTemplateDrivenValidationDecoratorsComponent,
			  },
}