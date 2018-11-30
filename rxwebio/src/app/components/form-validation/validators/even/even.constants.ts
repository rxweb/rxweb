import { EvenCompleteComponent } from "src/assets/examples/reactive-form-validators/decorators/even/complete/even-complete.component";
import { EvenCompleteTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/even/complete/even-complete.component";
import { EvenCompleteValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/even/complete/even-complete.component";
import { EvenConditionalExpressionComponent } from "src/assets/examples/reactive-form-validators/decorators/even/conditionalExpression/even-conditional-expression.component";
import { EvenConditionalExpressionTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/even/conditionalExpression/even-conditional-expression.component";
import { EvenConditionalExpressionValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/even/conditionalExpression/even-conditional-expression.component";
import { EvenMessageComponent } from "src/assets/examples/reactive-form-validators/decorators/even/message/even-message.component";
import { EvenMessageTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/even/message/even-message.component";
import { EvenMessageValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/even/message/even-message.component";
import { EvenDynamicComponent } from "src/assets/examples/reactive-form-validators/decorators/even/dynamic/even-dynamic.component";
import { EvenDynamicValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/even/dynamic/even-dynamic.component";
import { EvenAddComponent } from "src/assets/examples/reactive-form-validators/decorators/even/add/even-add.component";
import { EvenAddTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/even/add/even-add.component";
import { EvenAddValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/even/add/even-add.component";
import { EvenEditComponent } from "src/assets/examples/reactive-form-validators/decorators/even/edit/even-edit.component";

export const EVEN_COMPONENT_EXAMPLE_CONSTANT: { [key: string]: any } = {
	decorators:{
						complete : EvenCompleteComponent,
						conditionalExpression : EvenConditionalExpressionComponent,
						message : EvenMessageComponent,
						dynamic : EvenDynamicComponent,
						add : EvenAddComponent,
						edit : EvenEditComponent,
			  },
	validators:{
						complete : EvenCompleteValidatorComponent,
						conditionalExpression : EvenConditionalExpressionValidatorComponent,
						message : EvenMessageValidatorComponent,
						dynamic : EvenDynamicValidatorComponent,
						add : EvenAddValidatorComponent,
			  },
	template_driven:{
						complete : EvenCompleteTemplateDrivenComponent,
						conditionalExpression : EvenConditionalExpressionTemplateDrivenComponent,
						message : EvenMessageTemplateDrivenComponent,
						add : EvenAddTemplateDrivenComponent,
			  },
}