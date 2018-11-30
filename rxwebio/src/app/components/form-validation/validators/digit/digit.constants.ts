import { DigitCompleteComponent } from "src/assets/examples/reactive-form-validators/decorators/digit/complete/digit-complete.component";
import { DigitCompleteTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/digit/complete/digit-complete.component";
import { DigitCompleteValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/digit/complete/digit-complete.component";
import { DigitConditionalExpressionComponent } from "src/assets/examples/reactive-form-validators/decorators/digit/conditionalExpression/digit-conditional-expression.component";
import { DigitConditionalExpressionTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/digit/conditionalExpression/digit-conditional-expression.component";
import { DigitConditionalExpressionValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/digit/conditionalExpression/digit-conditional-expression.component";
import { DigitMessageComponent } from "src/assets/examples/reactive-form-validators/decorators/digit/message/digit-message.component";
import { DigitMessageTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/digit/message/digit-message.component";
import { DigitMessageValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/digit/message/digit-message.component";
import { DigitDynamicComponent } from "src/assets/examples/reactive-form-validators/decorators/digit/dynamic/digit-dynamic.component";
import { DigitDynamicValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/digit/dynamic/digit-dynamic.component";
import { DigitAddComponent } from "src/assets/examples/reactive-form-validators/decorators/digit/add/digit-add.component";
import { DigitAddTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/digit/add/digit-add.component";
import { DigitAddValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/digit/add/digit-add.component";
import { DigitEditComponent } from "src/assets/examples/reactive-form-validators/decorators/digit/edit/digit-edit.component";

export const DIGIT_COMPONENT_EXAMPLE_CONSTANT: { [key: string]: any } = {
	decorators:{
						complete : DigitCompleteComponent,
						conditionalExpression : DigitConditionalExpressionComponent,
						message : DigitMessageComponent,
						dynamic : DigitDynamicComponent,
						add : DigitAddComponent,
						edit : DigitEditComponent,
			  },
	validators:{
						complete : DigitCompleteValidatorComponent,
						conditionalExpression : DigitConditionalExpressionValidatorComponent,
						message : DigitMessageValidatorComponent,
						dynamic : DigitDynamicValidatorComponent,
						add : DigitAddValidatorComponent,
			  },
	template_driven:{
						complete : DigitCompleteTemplateDrivenComponent,
						conditionalExpression : DigitConditionalExpressionTemplateDrivenComponent,
						message : DigitMessageTemplateDrivenComponent,
						add : DigitAddTemplateDrivenComponent,
			  },
}