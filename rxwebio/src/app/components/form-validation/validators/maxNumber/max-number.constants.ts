import { MaxNumberCompleteComponent } from "src/assets/examples/reactive-form-validators/decorators/maxNumber/complete/max-number-complete.component";
import { MaxNumberCompleteTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/maxNumber/complete/max-number-complete.component";
import { MaxNumberCompleteValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/maxNumber/complete/max-number-complete.component";
import { MaxNumberValueComponent } from "src/assets/examples/reactive-form-validators/decorators/maxNumber/value/max-number-value.component";
import { MaxNumberValueTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/maxNumber/value/max-number-value.component";
import { MaxNumberValueValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/maxNumber/value/max-number-value.component";
import { MaxNumberConditionalExpressionComponent } from "src/assets/examples/reactive-form-validators/decorators/maxNumber/conditionalExpression/max-number-conditional-expression.component";
import { MaxNumberConditionalExpressionTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/maxNumber/conditionalExpression/max-number-conditional-expression.component";
import { MaxNumberConditionalExpressionValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/maxNumber/conditionalExpression/max-number-conditional-expression.component";
import { MaxNumberMessageComponent } from "src/assets/examples/reactive-form-validators/decorators/maxNumber/message/max-number-message.component";
import { MaxNumberMessageTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/maxNumber/message/max-number-message.component";
import { MaxNumberMessageValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/maxNumber/message/max-number-message.component";
import { MaxNumberDynamicComponent } from "src/assets/examples/reactive-form-validators/decorators/maxNumber/dynamic/max-number-dynamic.component";
import { MaxNumberDynamicValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/maxNumber/dynamic/max-number-dynamic.component";
import { MaxNumberAddComponent } from "src/assets/examples/reactive-form-validators/decorators/maxNumber/add/max-number-add.component";
import { MaxNumberAddTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/maxNumber/add/max-number-add.component";
import { MaxNumberAddValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/maxNumber/add/max-number-add.component";
import { MaxNumberEditComponent } from "src/assets/examples/reactive-form-validators/decorators/maxNumber/edit/max-number-edit.component";

export const MAX_NUMBER_COMPONENT_EXAMPLE_CONSTANT: { [key: string]: any } = {
	decorators:{
						complete : MaxNumberCompleteComponent,
						value : MaxNumberValueComponent,
						conditionalExpression : MaxNumberConditionalExpressionComponent,
						message : MaxNumberMessageComponent,
						dynamic : MaxNumberDynamicComponent,
						add : MaxNumberAddComponent,
						edit : MaxNumberEditComponent,
			  },
	validators:{
						complete : MaxNumberCompleteValidatorComponent,
						value : MaxNumberValueValidatorComponent,
						conditionalExpression : MaxNumberConditionalExpressionValidatorComponent,
						message : MaxNumberMessageValidatorComponent,
						dynamic : MaxNumberDynamicValidatorComponent,
						add : MaxNumberAddValidatorComponent,
			  },
	template_driven:{
						complete : MaxNumberCompleteTemplateDrivenComponent,
						value : MaxNumberValueTemplateDrivenComponent,
						conditionalExpression : MaxNumberConditionalExpressionTemplateDrivenComponent,
						message : MaxNumberMessageTemplateDrivenComponent,
						add : MaxNumberAddTemplateDrivenComponent,
			  },
}