import { GreaterThanEqualToCompleteComponent } from "src/assets/examples/reactive-form-validators/decorators/greaterThanEqualTo/complete/greater-than-equal-to-complete.component";
import { GreaterThanEqualToCompleteTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/greaterThanEqualTo/complete/greater-than-equal-to-complete.component";
import { GreaterThanEqualToCompleteValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/greaterThanEqualTo/complete/greater-than-equal-to-complete.component";
import { GreaterThanEqualToFieldNameComponent } from "src/assets/examples/reactive-form-validators/decorators/greaterThanEqualTo/fieldName/greater-than-equal-to-field-name.component";
import { GreaterThanEqualToFieldNameTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/greaterThanEqualTo/fieldName/greater-than-equal-to-field-name.component";
import { GreaterThanEqualToFieldNameValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/greaterThanEqualTo/fieldName/greater-than-equal-to-field-name.component";
import { GreaterThanEqualToConditionalExpressionComponent } from "src/assets/examples/reactive-form-validators/decorators/greaterThanEqualTo/conditionalExpression/greater-than-equal-to-conditional-expression.component";
import { GreaterThanEqualToConditionalExpressionTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/greaterThanEqualTo/conditionalExpression/greater-than-equal-to-conditional-expression.component";
import { GreaterThanEqualToConditionalExpressionValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/greaterThanEqualTo/conditionalExpression/greater-than-equal-to-conditional-expression.component";
import { GreaterThanEqualToMessageComponent } from "src/assets/examples/reactive-form-validators/decorators/greaterThanEqualTo/message/greater-than-equal-to-message.component";
import { GreaterThanEqualToMessageTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/greaterThanEqualTo/message/greater-than-equal-to-message.component";
import { GreaterThanEqualToMessageValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/greaterThanEqualTo/message/greater-than-equal-to-message.component";
import { GreaterThanEqualToDynamicComponent } from "src/assets/examples/reactive-form-validators/decorators/greaterThanEqualTo/dynamic/greater-than-equal-to-dynamic.component";
import { GreaterThanEqualToDynamicValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/greaterThanEqualTo/dynamic/greater-than-equal-to-dynamic.component";
import { GreaterThanEqualToAddComponent } from "src/assets/examples/reactive-form-validators/decorators/greaterThanEqualTo/add/greater-than-equal-to-add.component";
import { GreaterThanEqualToAddTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/greaterThanEqualTo/add/greater-than-equal-to-add.component";
import { GreaterThanEqualToAddValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/greaterThanEqualTo/add/greater-than-equal-to-add.component";
import { GreaterThanEqualToEditComponent } from "src/assets/examples/reactive-form-validators/decorators/greaterThanEqualTo/edit/greater-than-equal-to-edit.component";

export const GREATER_THAN_EQUAL_TO_COMPONENT_EXAMPLE_CONSTANT: { [key: string]: any } = {
	decorators:{
						complete : GreaterThanEqualToCompleteComponent,
						fieldName : GreaterThanEqualToFieldNameComponent,
						conditionalExpression : GreaterThanEqualToConditionalExpressionComponent,
						message : GreaterThanEqualToMessageComponent,
						dynamic : GreaterThanEqualToDynamicComponent,
						add : GreaterThanEqualToAddComponent,
						edit : GreaterThanEqualToEditComponent,
			  },
	validators:{
						complete : GreaterThanEqualToCompleteValidatorComponent,
						fieldName : GreaterThanEqualToFieldNameValidatorComponent,
						conditionalExpression : GreaterThanEqualToConditionalExpressionValidatorComponent,
						message : GreaterThanEqualToMessageValidatorComponent,
						dynamic : GreaterThanEqualToDynamicValidatorComponent,
						add : GreaterThanEqualToAddValidatorComponent,
			  },
	template_driven:{
						complete : GreaterThanEqualToCompleteTemplateDrivenComponent,
						fieldName : GreaterThanEqualToFieldNameTemplateDrivenComponent,
						conditionalExpression : GreaterThanEqualToConditionalExpressionTemplateDrivenComponent,
						message : GreaterThanEqualToMessageTemplateDrivenComponent,
						add : GreaterThanEqualToAddTemplateDrivenComponent,
			  },
}