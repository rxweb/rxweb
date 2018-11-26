import { MinNumberCompleteComponent } from "src/assets/examples/reactive-form-validators/decorators/minNumber/complete/min-number-complete.component";
import { MinNumberCompleteTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/minNumber/complete/min-number-complete.component";
import { MinNumberCompleteValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/minNumber/complete/min-number-complete.component";
import { MinNumberValueComponent } from "src/assets/examples/reactive-form-validators/decorators/minNumber/value/min-number-value.component";
import { MinNumberValueTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/minNumber/value/min-number-value.component";
import { MinNumberValueValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/minNumber/value/min-number-value.component";
import { MinNumberMessageComponent } from "src/assets/examples/reactive-form-validators/decorators/minNumber/message/min-number-message.component";
import { MinNumberMessageTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/minNumber/message/min-number-message.component";
import { MinNumberMessageValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/minNumber/message/min-number-message.component";
import { MinNumberConditionalExpressionComponent } from "src/assets/examples/reactive-form-validators/decorators/minNumber/conditionalExpression/min-number-conditional-expression.component";
import { MinNumberConditionalExpressionTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/minNumber/conditionalExpression/min-number-conditional-expression.component";
import { MinNumberConditionalExpressionValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/minNumber/conditionalExpression/min-number-conditional-expression.component";
import { MinNumberDynamicComponent } from "src/assets/examples/reactive-form-validators/decorators/minNumber/dynamic/min-number-dynamic.component";
import { MinNumberDynamicValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/minNumber/dynamic/min-number-dynamic.component";
import { MinNumberAddComponent } from "src/assets/examples/reactive-form-validators/decorators/minNumber/add/min-number-add.component";
import { MinNumberAddTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/minNumber/add/min-number-add.component";
import { MinNumberAddValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/minNumber/add/min-number-add.component";
import { MinNumberEditComponent } from "src/assets/examples/reactive-form-validators/decorators/minNumber/edit/min-number-edit.component";

export const MIN_NUMBER_COMPONENT_EXAMPLE_CONSTANT: { [key: string]: any } = {
	decorators:{
						complete : MinNumberCompleteComponent,
						value : MinNumberValueComponent,
						message : MinNumberMessageComponent,
						conditionalExpression : MinNumberConditionalExpressionComponent,
						dynamic : MinNumberDynamicComponent,
						add : MinNumberAddComponent,
						edit : MinNumberEditComponent,
			  },
	validators:{
						complete : MinNumberCompleteValidatorComponent,
						value : MinNumberValueValidatorComponent,
						message : MinNumberMessageValidatorComponent,
						conditionalExpression : MinNumberConditionalExpressionValidatorComponent,
						dynamic : MinNumberDynamicValidatorComponent,
						add : MinNumberAddValidatorComponent,
			  },
	template_driven:{
						complete : MinNumberCompleteTemplateDrivenComponent,
						value : MinNumberValueTemplateDrivenComponent,
						message : MinNumberMessageTemplateDrivenComponent,
						conditionalExpression : MinNumberConditionalExpressionTemplateDrivenComponent,
						add : MinNumberAddTemplateDrivenComponent,
			  },
}