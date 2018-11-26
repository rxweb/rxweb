import { DifferentCompleteComponent } from "src/assets/examples/reactive-form-validators/decorators/different/complete/different-complete.component";
import { DifferentCompleteTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/different/complete/different-complete.component";
import { DifferentCompleteValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/different/complete/different-complete.component";
import { DifferentFieldNameComponent } from "src/assets/examples/reactive-form-validators/decorators/different/fieldName/different-field-name.component";
import { DifferentFieldNameTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/different/fieldName/different-field-name.component";
import { DifferentFieldNameValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/different/fieldName/different-field-name.component";
import { DifferentMessageComponent } from "src/assets/examples/reactive-form-validators/decorators/different/message/different-message.component";
import { DifferentMessageTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/different/message/different-message.component";
import { DifferentMessageValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/different/message/different-message.component";
import { DifferentConditionalExpressionComponent } from "src/assets/examples/reactive-form-validators/decorators/different/conditionalExpression/different-conditional-expression.component";
import { DifferentConditionalExpressionTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/different/conditionalExpression/different-conditional-expression.component";
import { DifferentConditionalExpressionValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/different/conditionalExpression/different-conditional-expression.component";
import { DifferentDynamicComponent } from "src/assets/examples/reactive-form-validators/decorators/different/dynamic/different-dynamic.component";
import { DifferentDynamicValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/different/dynamic/different-dynamic.component";
import { DifferentAddComponent } from "src/assets/examples/reactive-form-validators/decorators/different/add/different-add.component";
import { DifferentAddTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/different/add/different-add.component";
import { DifferentAddValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/different/add/different-add.component";
import { DifferentEditComponent } from "src/assets/examples/reactive-form-validators/decorators/different/edit/different-edit.component";

export const DIFFERENT_COMPONENT_EXAMPLE_CONSTANT: { [key: string]: any } = {
	decorators:{
						complete : DifferentCompleteComponent,
						fieldName : DifferentFieldNameComponent,
						message : DifferentMessageComponent,
						conditionalExpression : DifferentConditionalExpressionComponent,
						dynamic : DifferentDynamicComponent,
						add : DifferentAddComponent,
						edit : DifferentEditComponent,
			  },
	validators:{
						complete : DifferentCompleteValidatorComponent,
						fieldName : DifferentFieldNameValidatorComponent,
						message : DifferentMessageValidatorComponent,
						conditionalExpression : DifferentConditionalExpressionValidatorComponent,
						dynamic : DifferentDynamicValidatorComponent,
						add : DifferentAddValidatorComponent,
			  },
	template_driven:{
						complete : DifferentCompleteTemplateDrivenComponent,
						fieldName : DifferentFieldNameTemplateDrivenComponent,
						message : DifferentMessageTemplateDrivenComponent,
						conditionalExpression : DifferentConditionalExpressionTemplateDrivenComponent,
						add : DifferentAddTemplateDrivenComponent,
			  },
}