import { MinLengthCompleteComponent } from "src/assets/examples/reactive-form-validators/decorators/minLength/complete/min-length-complete.component";
import { MinLengthCompleteTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/minLength/complete/min-length-complete.component";
import { MinLengthCompleteTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/minLength/complete/min-length-complete.component";
import { MinLengthCompleteValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/minLength/complete/min-length-complete.component";
import { MinLengthValueComponent } from "src/assets/examples/reactive-form-validators/decorators/minLength/value/min-length-value.component";
import { MinLengthValueTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/minLength/value/min-length-value.component";
import { MinLengthValueTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/minLength/value/min-length-value.component";
import { MinLengthValueValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/minLength/value/min-length-value.component";
import { MinLengthMessageComponent } from "src/assets/examples/reactive-form-validators/decorators/minLength/message/min-length-message.component";
import { MinLengthMessageTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/minLength/message/min-length-message.component";
import { MinLengthMessageTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/minLength/message/min-length-message.component";
import { MinLengthMessageValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/minLength/message/min-length-message.component";
import { MinLengthConditionalExpressionComponent } from "src/assets/examples/reactive-form-validators/decorators/minLength/conditionalExpression/min-length-conditional-expression.component";
import { MinLengthConditionalExpressionTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/minLength/conditionalExpression/min-length-conditional-expression.component";
import { MinLengthConditionalExpressionTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/minLength/conditionalExpression/min-length-conditional-expression.component";
import { MinLengthConditionalExpressionValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/minLength/conditionalExpression/min-length-conditional-expression.component";
import { MinLengthDynamicComponent } from "src/assets/examples/reactive-form-validators/decorators/minLength/dynamic/min-length-dynamic.component";
import { MinLengthDynamicValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/minLength/dynamic/min-length-dynamic.component";
import { MinLengthAddComponent } from "src/assets/examples/reactive-form-validators/decorators/minLength/add/min-length-add.component";
import { MinLengthAddTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/minLength/add/min-length-add.component";
import { MinLengthAddTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/minLength/add/min-length-add.component";
import { MinLengthAddValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/minLength/add/min-length-add.component";
import { MinLengthEditComponent } from "src/assets/examples/reactive-form-validators/decorators/minLength/edit/min-length-edit.component";

export const MIN_LENGTH_COMPONENT_EXAMPLE_CONSTANT: { [key: string]: any } = {
	decorators:{
						complete : MinLengthCompleteComponent,
						value : MinLengthValueComponent,
						message : MinLengthMessageComponent,
						conditionalExpression : MinLengthConditionalExpressionComponent,
						dynamic : MinLengthDynamicComponent,
						add : MinLengthAddComponent,
						edit : MinLengthEditComponent,
			  },
	template_driven_validation_directives:{
						complete : MinLengthCompleteTemplateDrivenValidationDirectivesComponent,
						value : MinLengthValueTemplateDrivenValidationDirectivesComponent,
						message : MinLengthMessageTemplateDrivenValidationDirectivesComponent,
						conditionalExpression : MinLengthConditionalExpressionTemplateDrivenValidationDirectivesComponent,
						add : MinLengthAddTemplateDrivenValidationDirectivesComponent,
			  },
	template_driven_validation_decorators:{
						complete : MinLengthCompleteTemplateDrivenValidationDecoratorsComponent,
						value : MinLengthValueTemplateDrivenValidationDecoratorsComponent,
						message : MinLengthMessageTemplateDrivenValidationDecoratorsComponent,
						conditionalExpression : MinLengthConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
						add : MinLengthAddTemplateDrivenValidationDecoratorsComponent,
			  },
	validators:{
						complete : MinLengthCompleteValidatorComponent,
						value : MinLengthValueValidatorComponent,
						message : MinLengthMessageValidatorComponent,
						conditionalExpression : MinLengthConditionalExpressionValidatorComponent,
						dynamic : MinLengthDynamicValidatorComponent,
						add : MinLengthAddValidatorComponent,
			  },
}