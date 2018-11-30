import { JsonCompleteComponent } from "src/assets/examples/reactive-form-validators/decorators/json/complete/json-complete.component";
import { JsonCompleteTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/json/complete/json-complete.component";
import { JsonCompleteValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/json/complete/json-complete.component";
import { JsonMessageComponent } from "src/assets/examples/reactive-form-validators/decorators/json/message/json-message.component";
import { JsonMessageTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/json/message/json-message.component";
import { JsonMessageValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/json/message/json-message.component";
import { JsonConditionalExpressionComponent } from "src/assets/examples/reactive-form-validators/decorators/json/conditionalExpression/json-conditional-expression.component";
import { JsonConditionalExpressionTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/json/conditionalExpression/json-conditional-expression.component";
import { JsonConditionalExpressionValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/json/conditionalExpression/json-conditional-expression.component";
import { JsonDynamicComponent } from "src/assets/examples/reactive-form-validators/decorators/json/dynamic/json-dynamic.component";
import { JsonDynamicValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/json/dynamic/json-dynamic.component";
import { JsonAddComponent } from "src/assets/examples/reactive-form-validators/decorators/json/add/json-add.component";
import { JsonAddTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/json/add/json-add.component";
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
	validators:{
						complete : JsonCompleteValidatorComponent,
						message : JsonMessageValidatorComponent,
						conditionalExpression : JsonConditionalExpressionValidatorComponent,
						dynamic : JsonDynamicValidatorComponent,
						add : JsonAddValidatorComponent,
			  },
	template_driven:{
						complete : JsonCompleteTemplateDrivenComponent,
						message : JsonMessageTemplateDrivenComponent,
						conditionalExpression : JsonConditionalExpressionTemplateDrivenComponent,
						add : JsonAddTemplateDrivenComponent,
			  },
}