import { EndsWithCompleteComponent } from "src/assets/examples/reactive-form-validators/decorators/endsWith/complete/ends-with-complete.component";
import { EndsWithCompleteTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/endsWith/complete/ends-with-complete.component";
import { EndsWithCompleteValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/endsWith/complete/ends-with-complete.component";
import { EndsWithValueComponent } from "src/assets/examples/reactive-form-validators/decorators/endsWith/value/ends-with-value.component";
import { EndsWithValueTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/endsWith/value/ends-with-value.component";
import { EndsWithValueValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/endsWith/value/ends-with-value.component";
import { EndsWithConditionalExpressionComponent } from "src/assets/examples/reactive-form-validators/decorators/endsWith/conditionalExpression/ends-with-conditional-expression.component";
import { EndsWithConditionalExpressionTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/endsWith/conditionalExpression/ends-with-conditional-expression.component";
import { EndsWithConditionalExpressionValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/endsWith/conditionalExpression/ends-with-conditional-expression.component";
import { EndsWithMessageComponent } from "src/assets/examples/reactive-form-validators/decorators/endsWith/message/ends-with-message.component";
import { EndsWithMessageTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/endsWith/message/ends-with-message.component";
import { EndsWithMessageValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/endsWith/message/ends-with-message.component";
import { EndsWithDynamicComponent } from "src/assets/examples/reactive-form-validators/decorators/endsWith/dynamic/ends-with-dynamic.component";
import { EndsWithDynamicValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/endsWith/dynamic/ends-with-dynamic.component";
import { EndsWithAddComponent } from "src/assets/examples/reactive-form-validators/decorators/endsWith/add/ends-with-add.component";
import { EndsWithAddTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/endsWith/add/ends-with-add.component";
import { EndsWithAddValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/endsWith/add/ends-with-add.component";
import { EndsWithEditComponent } from "src/assets/examples/reactive-form-validators/decorators/endsWith/edit/ends-with-edit.component";

export const ENDS_WITH_COMPONENT_EXAMPLE_CONSTANT: { [key: string]: any } = {
	decorators:{
						complete : EndsWithCompleteComponent,
						value : EndsWithValueComponent,
						conditionalExpression : EndsWithConditionalExpressionComponent,
						message : EndsWithMessageComponent,
						dynamic : EndsWithDynamicComponent,
						add : EndsWithAddComponent,
						edit : EndsWithEditComponent,
			  },
	validators:{
						complete : EndsWithCompleteValidatorComponent,
						value : EndsWithValueValidatorComponent,
						conditionalExpression : EndsWithConditionalExpressionValidatorComponent,
						message : EndsWithMessageValidatorComponent,
						dynamic : EndsWithDynamicValidatorComponent,
						add : EndsWithAddValidatorComponent,
			  },
	template_driven:{
						complete : EndsWithCompleteTemplateDrivenComponent,
						value : EndsWithValueTemplateDrivenComponent,
						conditionalExpression : EndsWithConditionalExpressionTemplateDrivenComponent,
						message : EndsWithMessageTemplateDrivenComponent,
						add : EndsWithAddTemplateDrivenComponent,
			  },
}