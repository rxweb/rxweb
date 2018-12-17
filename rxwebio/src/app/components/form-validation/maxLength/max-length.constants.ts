import { MaxLengthCompleteComponent } from "src/assets/examples/reactive-form-validators/decorators/maxLength/complete/max-length-complete.component";
import { MaxLengthCompleteTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/maxLength/complete/max-length-complete.component";
import { MaxLengthCompleteTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/maxLength/complete/max-length-complete.component";
import { MaxLengthCompleteValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/maxLength/complete/max-length-complete.component";
import { MaxLengthValueComponent } from "src/assets/examples/reactive-form-validators/decorators/maxLength/value/max-length-value.component";
import { MaxLengthValueTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/maxLength/value/max-length-value.component";
import { MaxLengthValueTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/maxLength/value/max-length-value.component";
import { MaxLengthValueValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/maxLength/value/max-length-value.component";
import { MaxLengthConditionalExpressionComponent } from "src/assets/examples/reactive-form-validators/decorators/maxLength/conditionalExpression/max-length-conditional-expression.component";
import { MaxLengthConditionalExpressionTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/maxLength/conditionalExpression/max-length-conditional-expression.component";
import { MaxLengthConditionalExpressionTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/maxLength/conditionalExpression/max-length-conditional-expression.component";
import { MaxLengthConditionalExpressionValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/maxLength/conditionalExpression/max-length-conditional-expression.component";
import { MaxLengthMessageComponent } from "src/assets/examples/reactive-form-validators/decorators/maxLength/message/max-length-message.component";
import { MaxLengthMessageTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/maxLength/message/max-length-message.component";
import { MaxLengthMessageTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/maxLength/message/max-length-message.component";
import { MaxLengthMessageValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/maxLength/message/max-length-message.component";
import { MaxLengthDynamicComponent } from "src/assets/examples/reactive-form-validators/decorators/maxLength/dynamic/max-length-dynamic.component";
import { MaxLengthDynamicValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/maxLength/dynamic/max-length-dynamic.component";
import { MaxLengthAddComponent } from "src/assets/examples/reactive-form-validators/decorators/maxLength/add/max-length-add.component";
import { MaxLengthAddTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/maxLength/add/max-length-add.component";
import { MaxLengthAddTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/maxLength/add/max-length-add.component";
import { MaxLengthAddValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/maxLength/add/max-length-add.component";
import { MaxLengthEditComponent } from "src/assets/examples/reactive-form-validators/decorators/maxLength/edit/max-length-edit.component";

export const MAX_LENGTH_COMPONENT_EXAMPLE_CONSTANT: { [key: string]: any } = {
	decorators:{
						complete : MaxLengthCompleteComponent,
						value : MaxLengthValueComponent,
						conditionalExpression : MaxLengthConditionalExpressionComponent,
						message : MaxLengthMessageComponent,
						dynamic : MaxLengthDynamicComponent,
						add : MaxLengthAddComponent,
						edit : MaxLengthEditComponent,
			  },
	validators:{
						complete : MaxLengthCompleteValidatorComponent,
						value : MaxLengthValueValidatorComponent,
						conditionalExpression : MaxLengthConditionalExpressionValidatorComponent,
						message : MaxLengthMessageValidatorComponent,
						dynamic : MaxLengthDynamicValidatorComponent,
						add : MaxLengthAddValidatorComponent,
			  },
	template_driven_validation_directives:{
						complete : MaxLengthCompleteTemplateDrivenValidationDirectivesComponent,
						value : MaxLengthValueTemplateDrivenValidationDirectivesComponent,
						conditionalExpression : MaxLengthConditionalExpressionTemplateDrivenValidationDirectivesComponent,
						message : MaxLengthMessageTemplateDrivenValidationDirectivesComponent,
						add : MaxLengthAddTemplateDrivenValidationDirectivesComponent,
			  },
	template_driven_validation_decorators:{
						complete : MaxLengthCompleteTemplateDrivenValidationDecoratorsComponent,
						value : MaxLengthValueTemplateDrivenValidationDecoratorsComponent,
						conditionalExpression : MaxLengthConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
						message : MaxLengthMessageTemplateDrivenValidationDecoratorsComponent,
						add : MaxLengthAddTemplateDrivenValidationDecoratorsComponent,
			  },
}