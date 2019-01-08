import { JsonCompleteComponent } from "src/assets/examples/reactive-form-validators/decorators/json/complete/json-complete.component";
import { JsonCompleteTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/json/complete/json-complete.component";
import { JsonCompleteTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/json/complete/json-complete.component";
import { JsonCompleteValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/json/complete/json-complete.component";
import { JsonMessageComponent } from "src/assets/examples/reactive-form-validators/decorators/json/message/json-message.component";
import { JsonMessageTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/json/message/json-message.component";
import { JsonMessageTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/json/message/json-message.component";
import { JsonMessageValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/json/message/json-message.component";
import { JsonConditionalExpressionComponent } from "src/assets/examples/reactive-form-validators/decorators/json/conditionalExpression/json-conditional-expression.component";
import { JsonConditionalExpressionTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/json/conditionalExpression/json-conditional-expression.component";
import { JsonConditionalExpressionTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/json/conditionalExpression/json-conditional-expression.component";
import { JsonConditionalExpressionValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/json/conditionalExpression/json-conditional-expression.component";
import { JsonDynamicComponent } from "src/assets/examples/reactive-form-validators/decorators/json/dynamic/json-dynamic.component";
import { JsonDynamicValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/json/dynamic/json-dynamic.component";
import { JsonAddComponent } from "src/assets/examples/reactive-form-validators/decorators/json/add/json-add.component";
import { JsonAddTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/json/add/json-add.component";
import { JsonAddTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/json/add/json-add.component";
import { JsonAddValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/json/add/json-add.component";
import { JsonEditComponent } from "src/assets/examples/reactive-form-validators/decorators/json/edit/json-edit.component";

export const JSON_COMPONENT_EXAMPLE_CONSTANT: { [key: string]: any } = {
	decorators:{
						complete : JsonCompleteComponent,
						message : JsonMessageComponent,
						conditionalExpression : JsonConditionalExpressionComponent,
						dynamic : JsonDynamicComponent,
						add : JsonAddComponent,
						edit : JsonEditComponent,
			  },
	template_driven_validation_directives:{
						complete : JsonCompleteTemplateDrivenValidationDirectivesComponent,
						message : JsonMessageTemplateDrivenValidationDirectivesComponent,
						conditionalExpression : JsonConditionalExpressionTemplateDrivenValidationDirectivesComponent,
						add : JsonAddTemplateDrivenValidationDirectivesComponent,
			  },
	template_driven_validation_decorators:{
						complete : JsonCompleteTemplateDrivenValidationDecoratorsComponent,
						message : JsonMessageTemplateDrivenValidationDecoratorsComponent,
						conditionalExpression : JsonConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
						add : JsonAddTemplateDrivenValidationDecoratorsComponent,
			  },
	validators:{
						complete : JsonCompleteValidatorComponent,
						message : JsonMessageValidatorComponent,
						conditionalExpression : JsonConditionalExpressionValidatorComponent,
						dynamic : JsonDynamicValidatorComponent,
						add : JsonAddValidatorComponent,
			  },
}