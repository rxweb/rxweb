import { CusipCompleteComponent } from "src/assets/examples/reactive-form-validators/decorators/cusip/complete/cusip-complete.component";
import { CusipCompleteTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/cusip/complete/cusip-complete.component";
import { CusipCompleteTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/cusip/complete/cusip-complete.component";
import { CusipCompleteValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/cusip/complete/cusip-complete.component";
import { CusipConditionalExpressionComponent } from "src/assets/examples/reactive-form-validators/decorators/cusip/conditionalExpression/cusip-conditional-expression.component";
import { CusipConditionalExpressionTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/cusip/conditionalExpression/cusip-conditional-expression.component";
import { CusipConditionalExpressionTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/cusip/conditionalExpression/cusip-conditional-expression.component";
import { CusipConditionalExpressionValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/cusip/conditionalExpression/cusip-conditional-expression.component";
import { CusipMessageComponent } from "src/assets/examples/reactive-form-validators/decorators/cusip/message/cusip-message.component";
import { CusipMessageTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/cusip/message/cusip-message.component";
import { CusipMessageTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/cusip/message/cusip-message.component";
import { CusipMessageValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/cusip/message/cusip-message.component";
import { CusipDynamicComponent } from "src/assets/examples/reactive-form-validators/decorators/cusip/dynamic/cusip-dynamic.component";
import { CusipDynamicValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/cusip/dynamic/cusip-dynamic.component";
import { CusipAddComponent } from "src/assets/examples/reactive-form-validators/decorators/cusip/add/cusip-add.component";
import { CusipAddTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/cusip/add/cusip-add.component";
import { CusipAddTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/cusip/add/cusip-add.component";
import { CusipAddValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/cusip/add/cusip-add.component";
import { CusipEditComponent } from "src/assets/examples/reactive-form-validators/decorators/cusip/edit/cusip-edit.component";

export const CUSIP_COMPONENT_EXAMPLE_CONSTANT: { [key: string]: any } = {
	decorators:{
						complete : CusipCompleteComponent,
						conditionalExpression : CusipConditionalExpressionComponent,
						message : CusipMessageComponent,
						dynamic : CusipDynamicComponent,
						add : CusipAddComponent,
						edit : CusipEditComponent,
			  },
	template_driven_validation_directives:{
						complete : CusipCompleteTemplateDrivenValidationDirectivesComponent,
						conditionalExpression : CusipConditionalExpressionTemplateDrivenValidationDirectivesComponent,
						message : CusipMessageTemplateDrivenValidationDirectivesComponent,
						add : CusipAddTemplateDrivenValidationDirectivesComponent,
			  },
	template_driven_validation_decorators:{
						complete : CusipCompleteTemplateDrivenValidationDecoratorsComponent,
						conditionalExpression : CusipConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
						message : CusipMessageTemplateDrivenValidationDecoratorsComponent,
						add : CusipAddTemplateDrivenValidationDecoratorsComponent,
			  },
	validators:{
						complete : CusipCompleteValidatorComponent,
						conditionalExpression : CusipConditionalExpressionValidatorComponent,
						message : CusipMessageValidatorComponent,
						dynamic : CusipDynamicValidatorComponent,
						add : CusipAddValidatorComponent,
			  },
}