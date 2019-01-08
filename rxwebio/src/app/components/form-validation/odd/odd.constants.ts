import { OddCompleteComponent } from "src/assets/examples/reactive-form-validators/decorators/odd/complete/odd-complete.component";
import { OddCompleteTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/odd/complete/odd-complete.component";
import { OddCompleteTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/odd/complete/odd-complete.component";
import { OddCompleteValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/odd/complete/odd-complete.component";
import { OddConditionalExpressionComponent } from "src/assets/examples/reactive-form-validators/decorators/odd/conditionalExpression/odd-conditional-expression.component";
import { OddConditionalExpressionTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/odd/conditionalExpression/odd-conditional-expression.component";
import { OddConditionalExpressionTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/odd/conditionalExpression/odd-conditional-expression.component";
import { OddConditionalExpressionValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/odd/conditionalExpression/odd-conditional-expression.component";
import { OddMessageComponent } from "src/assets/examples/reactive-form-validators/decorators/odd/message/odd-message.component";
import { OddMessageTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/odd/message/odd-message.component";
import { OddMessageTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/odd/message/odd-message.component";
import { OddMessageValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/odd/message/odd-message.component";
import { OddDynamicComponent } from "src/assets/examples/reactive-form-validators/decorators/odd/dynamic/odd-dynamic.component";
import { OddDynamicValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/odd/dynamic/odd-dynamic.component";
import { OddAddComponent } from "src/assets/examples/reactive-form-validators/decorators/odd/add/odd-add.component";
import { OddAddTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/odd/add/odd-add.component";
import { OddAddTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/odd/add/odd-add.component";
import { OddAddValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/odd/add/odd-add.component";
import { OddEditComponent } from "src/assets/examples/reactive-form-validators/decorators/odd/edit/odd-edit.component";

export const ODD_COMPONENT_EXAMPLE_CONSTANT: { [key: string]: any } = {
	decorators:{
						complete : OddCompleteComponent,
						conditionalExpression : OddConditionalExpressionComponent,
						message : OddMessageComponent,
						dynamic : OddDynamicComponent,
						add : OddAddComponent,
						edit : OddEditComponent,
			  },
	template_driven_validation_directives:{
						complete : OddCompleteTemplateDrivenValidationDirectivesComponent,
						conditionalExpression : OddConditionalExpressionTemplateDrivenValidationDirectivesComponent,
						message : OddMessageTemplateDrivenValidationDirectivesComponent,
						add : OddAddTemplateDrivenValidationDirectivesComponent,
			  },
	template_driven_validation_decorators:{
						complete : OddCompleteTemplateDrivenValidationDecoratorsComponent,
						conditionalExpression : OddConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
						message : OddMessageTemplateDrivenValidationDecoratorsComponent,
						add : OddAddTemplateDrivenValidationDecoratorsComponent,
			  },
	validators:{
						complete : OddCompleteValidatorComponent,
						conditionalExpression : OddConditionalExpressionValidatorComponent,
						message : OddMessageValidatorComponent,
						dynamic : OddDynamicValidatorComponent,
						add : OddAddValidatorComponent,
			  },
}