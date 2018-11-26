import { MaxLengthCompleteComponent } from "src/assets/examples/reactive-form-validators/decorators/maxLength/complete/max-length-complete.component";
import { MaxLengthCompleteTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/maxLength/complete/max-length-complete.component";
import { MaxLengthCompleteValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/maxLength/complete/max-length-complete.component";
import { MaxLengthValueComponent } from "src/assets/examples/reactive-form-validators/decorators/maxLength/value/max-length-value.component";
import { MaxLengthValueTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/maxLength/value/max-length-value.component";
import { MaxLengthValueValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/maxLength/value/max-length-value.component";
import { MaxLengthConditionalExpressionComponent } from "src/assets/examples/reactive-form-validators/decorators/maxLength/conditionalExpression/max-length-conditional-expression.component";
import { MaxLengthConditionalExpressionTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/maxLength/conditionalExpression/max-length-conditional-expression.component";
import { MaxLengthConditionalExpressionValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/maxLength/conditionalExpression/max-length-conditional-expression.component";
import { MaxLengthMessageComponent } from "src/assets/examples/reactive-form-validators/decorators/maxLength/message/max-length-message.component";
import { MaxLengthMessageTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/maxLength/message/max-length-message.component";
import { MaxLengthMessageValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/maxLength/message/max-length-message.component";
import { MaxLengthDynamicComponent } from "src/assets/examples/reactive-form-validators/decorators/maxLength/dynamic/max-length-dynamic.component";
import { MaxLengthDynamicValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/maxLength/dynamic/max-length-dynamic.component";
import { MaxLengthAddComponent } from "src/assets/examples/reactive-form-validators/decorators/maxLength/add/max-length-add.component";
import { MaxLengthAddTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/maxLength/add/max-length-add.component";
import { MaxLengthAddValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/maxLength/add/max-length-add.component";
import { MaxLengthEditComponent } from "src/assets/examples/reactive-form-validators/decorators/maxLength/edit/max-length-edit.component";

export const MAX_LENGTH_COMPONENT_EXAMPLE_CONSTANT: { [key: string]: any } = {
	decorators:{
						complete : MaxLengthCompleteComponent,
						value : MaxLengthValueComponent,
						conditionalExpression : MaxLengthConditionalExpressionComponent,
						message : MaxLengthMessageComponent,
						dynamic : MaxLengthDynamicComponent,
						add : MaxLengthAddComponent,
						edit : MaxLengthEditComponent,
			  },
	validators:{
						complete : MaxLengthCompleteValidatorComponent,
						value : MaxLengthValueValidatorComponent,
						conditionalExpression : MaxLengthConditionalExpressionValidatorComponent,
						message : MaxLengthMessageValidatorComponent,
						dynamic : MaxLengthDynamicValidatorComponent,
						add : MaxLengthAddValidatorComponent,
			  },
	template_driven:{
						complete : MaxLengthCompleteTemplateDrivenComponent,
						value : MaxLengthValueTemplateDrivenComponent,
						conditionalExpression : MaxLengthConditionalExpressionTemplateDrivenComponent,
						message : MaxLengthMessageTemplateDrivenComponent,
						add : MaxLengthAddTemplateDrivenComponent,
			  },
}