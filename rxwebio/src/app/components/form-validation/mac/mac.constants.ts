import { MacCompleteComponent } from "src/assets/examples/reactive-form-validators/decorators/mac/complete/mac-complete.component";
import { MacCompleteTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/mac/complete/mac-complete.component";
import { MacCompleteTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/mac/complete/mac-complete.component";
import { MacCompleteValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/mac/complete/mac-complete.component";
import { MacConditionalExpressionComponent } from "src/assets/examples/reactive-form-validators/decorators/mac/conditionalExpression/mac-conditional-expression.component";
import { MacConditionalExpressionTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/mac/conditionalExpression/mac-conditional-expression.component";
import { MacConditionalExpressionTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/mac/conditionalExpression/mac-conditional-expression.component";
import { MacConditionalExpressionValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/mac/conditionalExpression/mac-conditional-expression.component";
import { MacMessageComponent } from "src/assets/examples/reactive-form-validators/decorators/mac/message/mac-message.component";
import { MacMessageTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/mac/message/mac-message.component";
import { MacMessageTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/mac/message/mac-message.component";
import { MacMessageValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/mac/message/mac-message.component";
import { MacDynamicComponent } from "src/assets/examples/reactive-form-validators/decorators/mac/dynamic/mac-dynamic.component";
import { MacDynamicValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/mac/dynamic/mac-dynamic.component";
import { MacAddComponent } from "src/assets/examples/reactive-form-validators/decorators/mac/add/mac-add.component";
import { MacAddTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/mac/add/mac-add.component";
import { MacAddTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/mac/add/mac-add.component";
import { MacAddValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/mac/add/mac-add.component";
import { MacEditComponent } from "src/assets/examples/reactive-form-validators/decorators/mac/edit/mac-edit.component";

export const MAC_COMPONENT_EXAMPLE_CONSTANT: { [key: string]: any } = {
	decorators:{
						complete : MacCompleteComponent,
						conditionalExpression : MacConditionalExpressionComponent,
						message : MacMessageComponent,
						dynamic : MacDynamicComponent,
						add : MacAddComponent,
						edit : MacEditComponent,
			  },
	validators:{
						complete : MacCompleteValidatorComponent,
						conditionalExpression : MacConditionalExpressionValidatorComponent,
						message : MacMessageValidatorComponent,
						dynamic : MacDynamicValidatorComponent,
						add : MacAddValidatorComponent,
			  },
	template_driven_validation_directives:{
						complete : MacCompleteTemplateDrivenValidationDirectivesComponent,
						conditionalExpression : MacConditionalExpressionTemplateDrivenValidationDirectivesComponent,
						message : MacMessageTemplateDrivenValidationDirectivesComponent,
						add : MacAddTemplateDrivenValidationDirectivesComponent,
			  },
	template_driven_validation_decorators:{
						complete : MacCompleteTemplateDrivenValidationDecoratorsComponent,
						conditionalExpression : MacConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
						message : MacMessageTemplateDrivenValidationDecoratorsComponent,
						add : MacAddTemplateDrivenValidationDecoratorsComponent,
			  },
}