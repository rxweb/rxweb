import { ContainsCompleteComponent } from "src/assets/examples/reactive-form-validators/decorators/contains/complete/contains-complete.component";
import { ContainsCompleteTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/contains/complete/contains-complete.component";
import { ContainsCompleteTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/contains/complete/contains-complete.component";
import { ContainsCompleteValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/contains/complete/contains-complete.component";
import { ContainsValueComponent } from "src/assets/examples/reactive-form-validators/decorators/contains/value/contains-value.component";
import { ContainsValueTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/contains/value/contains-value.component";
import { ContainsValueTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/contains/value/contains-value.component";
import { ContainsValueValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/contains/value/contains-value.component";
import { ContainsConditionalExpressionComponent } from "src/assets/examples/reactive-form-validators/decorators/contains/conditionalExpression/contains-conditional-expression.component";
import { ContainsConditionalExpressionTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/contains/conditionalExpression/contains-conditional-expression.component";
import { ContainsConditionalExpressionTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/contains/conditionalExpression/contains-conditional-expression.component";
import { ContainsConditionalExpressionValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/contains/conditionalExpression/contains-conditional-expression.component";
import { ContainsMessageComponent } from "src/assets/examples/reactive-form-validators/decorators/contains/message/contains-message.component";
import { ContainsMessageTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/contains/message/contains-message.component";
import { ContainsMessageTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/contains/message/contains-message.component";
import { ContainsMessageValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/contains/message/contains-message.component";
import { ContainsDynamicComponent } from "src/assets/examples/reactive-form-validators/decorators/contains/dynamic/contains-dynamic.component";
import { ContainsDynamicValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/contains/dynamic/contains-dynamic.component";
import { ContainsAddComponent } from "src/assets/examples/reactive-form-validators/decorators/contains/add/contains-add.component";
import { ContainsAddTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/contains/add/contains-add.component";
import { ContainsAddTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/contains/add/contains-add.component";
import { ContainsAddValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/contains/add/contains-add.component";
import { ContainsEditComponent } from "src/assets/examples/reactive-form-validators/decorators/contains/edit/contains-edit.component";

export const CONTAINS_COMPONENT_EXAMPLE_CONSTANT: { [key: string]: any } = {
	decorators:{
						complete : ContainsCompleteComponent,
						value : ContainsValueComponent,
						conditionalExpression : ContainsConditionalExpressionComponent,
						message : ContainsMessageComponent,
						dynamic : ContainsDynamicComponent,
						add : ContainsAddComponent,
						edit : ContainsEditComponent,
			  },
	validators:{
						complete : ContainsCompleteValidatorComponent,
						value : ContainsValueValidatorComponent,
						conditionalExpression : ContainsConditionalExpressionValidatorComponent,
						message : ContainsMessageValidatorComponent,
						dynamic : ContainsDynamicValidatorComponent,
						add : ContainsAddValidatorComponent,
			  },
	template_driven_validation_directives:{
						complete : ContainsCompleteTemplateDrivenValidationDirectivesComponent,
						value : ContainsValueTemplateDrivenValidationDirectivesComponent,
						conditionalExpression : ContainsConditionalExpressionTemplateDrivenValidationDirectivesComponent,
						message : ContainsMessageTemplateDrivenValidationDirectivesComponent,
						add : ContainsAddTemplateDrivenValidationDirectivesComponent,
			  },
	template_driven_validation_decorators:{
						complete : ContainsCompleteTemplateDrivenValidationDecoratorsComponent,
						value : ContainsValueTemplateDrivenValidationDecoratorsComponent,
						conditionalExpression : ContainsConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
						message : ContainsMessageTemplateDrivenValidationDecoratorsComponent,
						add : ContainsAddTemplateDrivenValidationDecoratorsComponent,
			  },
}