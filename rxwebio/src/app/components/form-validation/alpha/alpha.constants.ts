import { AlphaCompleteComponent } from "src/assets/examples/reactive-form-validators/decorators/alpha/complete/alpha-complete.component";
import { AlphaCompleteTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/alpha/complete/alpha-complete.component";
import { AlphaCompleteTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/alpha/complete/alpha-complete.component";
import { AlphaCompleteValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/alpha/complete/alpha-complete.component";
import { AlphaConditionalExpressionComponent } from "src/assets/examples/reactive-form-validators/decorators/alpha/conditionalExpression/alpha-conditional-expression.component";
import { AlphaConditionalExpressionTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/alpha/conditionalExpression/alpha-conditional-expression.component";
import { AlphaConditionalExpressionTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/alpha/conditionalExpression/alpha-conditional-expression.component";
import { AlphaConditionalExpressionValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/alpha/conditionalExpression/alpha-conditional-expression.component";
import { AlphaAllowWhiteSpaceComponent } from "src/assets/examples/reactive-form-validators/decorators/alpha/allowWhiteSpace/alpha-allow-white-space.component";
import { AlphaAllowWhiteSpaceTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/alpha/allowWhiteSpace/alpha-allow-white-space.component";
import { AlphaAllowWhiteSpaceTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/alpha/allowWhiteSpace/alpha-allow-white-space.component";
import { AlphaAllowWhiteSpaceValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/alpha/allowWhiteSpace/alpha-allow-white-space.component";
import { AlphaMessageComponent } from "src/assets/examples/reactive-form-validators/decorators/alpha/message/alpha-message.component";
import { AlphaMessageTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/alpha/message/alpha-message.component";
import { AlphaMessageTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/alpha/message/alpha-message.component";
import { AlphaMessageValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/alpha/message/alpha-message.component";
import { AlphaDynamicComponent } from "src/assets/examples/reactive-form-validators/decorators/alpha/dynamic/alpha-dynamic.component";
import { AlphaDynamicValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/alpha/dynamic/alpha-dynamic.component";
import { AlphaAddComponent } from "src/assets/examples/reactive-form-validators/decorators/alpha/add/alpha-add.component";
import { AlphaAddTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/alpha/add/alpha-add.component";
import { AlphaAddTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/alpha/add/alpha-add.component";
import { AlphaAddValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/alpha/add/alpha-add.component";
import { AlphaEditComponent } from "src/assets/examples/reactive-form-validators/decorators/alpha/edit/alpha-edit.component";

export const ALPHA_COMPONENT_EXAMPLE_CONSTANT: { [key: string]: any } = {
	decorators:{
						complete : AlphaCompleteComponent,
						conditionalExpression : AlphaConditionalExpressionComponent,
						allowWhiteSpace : AlphaAllowWhiteSpaceComponent,
						message : AlphaMessageComponent,
						dynamic : AlphaDynamicComponent,
						add : AlphaAddComponent,
						edit : AlphaEditComponent,
			  },
	template_driven_validation_directives:{
						complete : AlphaCompleteTemplateDrivenValidationDirectivesComponent,
						conditionalExpression : AlphaConditionalExpressionTemplateDrivenValidationDirectivesComponent,
						allowWhiteSpace : AlphaAllowWhiteSpaceTemplateDrivenValidationDirectivesComponent,
						message : AlphaMessageTemplateDrivenValidationDirectivesComponent,
						add : AlphaAddTemplateDrivenValidationDirectivesComponent,
			  },
	template_driven_validation_decorators:{
						complete : AlphaCompleteTemplateDrivenValidationDecoratorsComponent,
						conditionalExpression : AlphaConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
						allowWhiteSpace : AlphaAllowWhiteSpaceTemplateDrivenValidationDecoratorsComponent,
						message : AlphaMessageTemplateDrivenValidationDecoratorsComponent,
						add : AlphaAddTemplateDrivenValidationDecoratorsComponent,
			  },
	validators:{
						complete : AlphaCompleteValidatorComponent,
						conditionalExpression : AlphaConditionalExpressionValidatorComponent,
						allowWhiteSpace : AlphaAllowWhiteSpaceValidatorComponent,
						message : AlphaMessageValidatorComponent,
						dynamic : AlphaDynamicValidatorComponent,
						add : AlphaAddValidatorComponent,
			  },
}