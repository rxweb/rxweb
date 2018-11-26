import { GreaterThanCompleteComponent } from "src/assets/examples/reactive-form-validators/decorators/greaterThan/complete/greater-than-complete.component";
import { GreaterThanCompleteTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/greaterThan/complete/greater-than-complete.component";
import { GreaterThanCompleteValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/greaterThan/complete/greater-than-complete.component";
import { GreaterThanFieldNameComponent } from "src/assets/examples/reactive-form-validators/decorators/greaterThan/fieldName/greater-than-field-name.component";
import { GreaterThanFieldNameTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/greaterThan/fieldName/greater-than-field-name.component";
import { GreaterThanFieldNameValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/greaterThan/fieldName/greater-than-field-name.component";
import { GreaterThanConditionalExpressionComponent } from "src/assets/examples/reactive-form-validators/decorators/greaterThan/conditionalExpression/greater-than-conditional-expression.component";
import { GreaterThanConditionalExpressionTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/greaterThan/conditionalExpression/greater-than-conditional-expression.component";
import { GreaterThanConditionalExpressionValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/greaterThan/conditionalExpression/greater-than-conditional-expression.component";
import { GreaterThanMessageComponent } from "src/assets/examples/reactive-form-validators/decorators/greaterThan/message/greater-than-message.component";
import { GreaterThanMessageTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/greaterThan/message/greater-than-message.component";
import { GreaterThanMessageValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/greaterThan/message/greater-than-message.component";
import { GreaterThanDynamicComponent } from "src/assets/examples/reactive-form-validators/decorators/greaterThan/dynamic/greater-than-dynamic.component";
import { GreaterThanDynamicValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/greaterThan/dynamic/greater-than-dynamic.component";
import { GreaterThanAddComponent } from "src/assets/examples/reactive-form-validators/decorators/greaterThan/add/greater-than-add.component";
import { GreaterThanAddTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/greaterThan/add/greater-than-add.component";
import { GreaterThanAddValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/greaterThan/add/greater-than-add.component";
import { GreaterThanEditComponent } from "src/assets/examples/reactive-form-validators/decorators/greaterThan/edit/greater-than-edit.component";

export const GREATER_THAN_COMPONENT_EXAMPLE_CONSTANT: { [key: string]: any } = {
	decorators:{
						complete : GreaterThanCompleteComponent,
						fieldName : GreaterThanFieldNameComponent,
						conditionalExpression : GreaterThanConditionalExpressionComponent,
						message : GreaterThanMessageComponent,
						dynamic : GreaterThanDynamicComponent,
						add : GreaterThanAddComponent,
						edit : GreaterThanEditComponent,
			  },
	validators:{
						complete : GreaterThanCompleteValidatorComponent,
						fieldName : GreaterThanFieldNameValidatorComponent,
						conditionalExpression : GreaterThanConditionalExpressionValidatorComponent,
						message : GreaterThanMessageValidatorComponent,
						dynamic : GreaterThanDynamicValidatorComponent,
						add : GreaterThanAddValidatorComponent,
			  },
	template_driven:{
						complete : GreaterThanCompleteTemplateDrivenComponent,
						fieldName : GreaterThanFieldNameTemplateDrivenComponent,
						conditionalExpression : GreaterThanConditionalExpressionTemplateDrivenComponent,
						message : GreaterThanMessageTemplateDrivenComponent,
						add : GreaterThanAddTemplateDrivenComponent,
			  },
}