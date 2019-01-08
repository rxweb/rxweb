import { HexColorCompleteComponent } from "src/assets/examples/reactive-form-validators/decorators/hexColor/complete/hex-color-complete.component";
import { HexColorCompleteTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/hexColor/complete/hex-color-complete.component";
import { HexColorCompleteTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/hexColor/complete/hex-color-complete.component";
import { HexColorCompleteValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/hexColor/complete/hex-color-complete.component";
import { HexColorConditionalExpressionComponent } from "src/assets/examples/reactive-form-validators/decorators/hexColor/conditionalExpression/hex-color-conditional-expression.component";
import { HexColorConditionalExpressionTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/hexColor/conditionalExpression/hex-color-conditional-expression.component";
import { HexColorConditionalExpressionTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/hexColor/conditionalExpression/hex-color-conditional-expression.component";
import { HexColorConditionalExpressionValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/hexColor/conditionalExpression/hex-color-conditional-expression.component";
import { HexColorMessageComponent } from "src/assets/examples/reactive-form-validators/decorators/hexColor/message/hex-color-message.component";
import { HexColorMessageTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/hexColor/message/hex-color-message.component";
import { HexColorMessageTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/hexColor/message/hex-color-message.component";
import { HexColorMessageValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/hexColor/message/hex-color-message.component";
import { HexColorDynamicComponent } from "src/assets/examples/reactive-form-validators/decorators/hexColor/dynamic/hex-color-dynamic.component";
import { HexColorDynamicValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/hexColor/dynamic/hex-color-dynamic.component";
import { HexColorAddComponent } from "src/assets/examples/reactive-form-validators/decorators/hexColor/add/hex-color-add.component";
import { HexColorAddTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/hexColor/add/hex-color-add.component";
import { HexColorAddTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/hexColor/add/hex-color-add.component";
import { HexColorAddValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/hexColor/add/hex-color-add.component";
import { HexColorEditComponent } from "src/assets/examples/reactive-form-validators/decorators/hexColor/edit/hex-color-edit.component";

export const HEX_COLOR_COMPONENT_EXAMPLE_CONSTANT: { [key: string]: any } = {
	decorators:{
						complete : HexColorCompleteComponent,
						conditionalExpression : HexColorConditionalExpressionComponent,
						message : HexColorMessageComponent,
						dynamic : HexColorDynamicComponent,
						add : HexColorAddComponent,
						edit : HexColorEditComponent,
			  },
	template_driven_validation_directives:{
						complete : HexColorCompleteTemplateDrivenValidationDirectivesComponent,
						conditionalExpression : HexColorConditionalExpressionTemplateDrivenValidationDirectivesComponent,
						message : HexColorMessageTemplateDrivenValidationDirectivesComponent,
						add : HexColorAddTemplateDrivenValidationDirectivesComponent,
			  },
	template_driven_validation_decorators:{
						complete : HexColorCompleteTemplateDrivenValidationDecoratorsComponent,
						conditionalExpression : HexColorConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
						message : HexColorMessageTemplateDrivenValidationDecoratorsComponent,
						add : HexColorAddTemplateDrivenValidationDecoratorsComponent,
			  },
	validators:{
						complete : HexColorCompleteValidatorComponent,
						conditionalExpression : HexColorConditionalExpressionValidatorComponent,
						message : HexColorMessageValidatorComponent,
						dynamic : HexColorDynamicValidatorComponent,
						add : HexColorAddValidatorComponent,
			  },
}