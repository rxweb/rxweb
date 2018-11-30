import { MinLengthCompleteComponent } from "src/assets/examples/reactive-form-validators/decorators/minLength/complete/min-length-complete.component";
import { MinLengthCompleteTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/minLength/complete/min-length-complete.component";
import { MinLengthCompleteValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/minLength/complete/min-length-complete.component";
import { MinLengthValueComponent } from "src/assets/examples/reactive-form-validators/decorators/minLength/value/min-length-value.component";
import { MinLengthValueTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/minLength/value/min-length-value.component";
import { MinLengthValueValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/minLength/value/min-length-value.component";
import { MinLengthMessageComponent } from "src/assets/examples/reactive-form-validators/decorators/minLength/message/min-length-message.component";
import { MinLengthMessageTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/minLength/message/min-length-message.component";
import { MinLengthMessageValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/minLength/message/min-length-message.component";
import { MinLengthConditionalExpressionComponent } from "src/assets/examples/reactive-form-validators/decorators/minLength/conditionalExpression/min-length-conditional-expression.component";
import { MinLengthConditionalExpressionTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/minLength/conditionalExpression/min-length-conditional-expression.component";
import { MinLengthConditionalExpressionValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/minLength/conditionalExpression/min-length-conditional-expression.component";
import { MinLengthDynamicComponent } from "src/assets/examples/reactive-form-validators/decorators/minLength/dynamic/min-length-dynamic.component";
import { MinLengthDynamicValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/minLength/dynamic/min-length-dynamic.component";
import { MinLengthAddComponent } from "src/assets/examples/reactive-form-validators/decorators/minLength/add/min-length-add.component";
import { MinLengthAddTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/minLength/add/min-length-add.component";
import { MinLengthAddValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/minLength/add/min-length-add.component";
import { MinLengthEditComponent } from "src/assets/examples/reactive-form-validators/decorators/minLength/edit/min-length-edit.component";

export const MIN_LENGTH_COMPONENT_EXAMPLE_CONSTANT: { [key: string]: any } = {
	decorators:{
						complete : MinLengthCompleteComponent,
						value : MinLengthValueComponent,
						message : MinLengthMessageComponent,
						conditionalExpression : MinLengthConditionalExpressionComponent,
						dynamic : MinLengthDynamicComponent,
						add : MinLengthAddComponent,
						edit : MinLengthEditComponent,
			  },
	validators:{
						complete : MinLengthCompleteValidatorComponent,
						value : MinLengthValueValidatorComponent,
						message : MinLengthMessageValidatorComponent,
						conditionalExpression : MinLengthConditionalExpressionValidatorComponent,
						dynamic : MinLengthDynamicValidatorComponent,
						add : MinLengthAddValidatorComponent,
			  },
	template_driven:{
						complete : MinLengthCompleteTemplateDrivenComponent,
						value : MinLengthValueTemplateDrivenComponent,
						message : MinLengthMessageTemplateDrivenComponent,
						conditionalExpression : MinLengthConditionalExpressionTemplateDrivenComponent,
						add : MinLengthAddTemplateDrivenComponent,
			  },
}