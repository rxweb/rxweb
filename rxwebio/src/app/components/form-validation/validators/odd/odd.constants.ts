import { OddCompleteComponent } from "src/assets/examples/reactive-form-validators/decorators/odd/complete/odd-complete.component";
import { OddCompleteTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/odd/complete/odd-complete.component";
import { OddCompleteValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/odd/complete/odd-complete.component";
import { OddConditionalExpressionComponent } from "src/assets/examples/reactive-form-validators/decorators/odd/conditionalExpression/odd-conditional-expression.component";
import { OddConditionalExpressionTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/odd/conditionalExpression/odd-conditional-expression.component";
import { OddConditionalExpressionValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/odd/conditionalExpression/odd-conditional-expression.component";
import { OddMessageComponent } from "src/assets/examples/reactive-form-validators/decorators/odd/message/odd-message.component";
import { OddMessageTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/odd/message/odd-message.component";
import { OddMessageValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/odd/message/odd-message.component";
import { OddDynamicComponent } from "src/assets/examples/reactive-form-validators/decorators/odd/dynamic/odd-dynamic.component";
import { OddDynamicValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/odd/dynamic/odd-dynamic.component";
import { OddAddComponent } from "src/assets/examples/reactive-form-validators/decorators/odd/add/odd-add.component";
import { OddAddTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/odd/add/odd-add.component";
import { OddAddValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/odd/add/odd-add.component";
import { OddEditComponent } from "src/assets/examples/reactive-form-validators/decorators/odd/edit/odd-edit.component";

export const ODD_COMPONENT_EXAMPLE_CONSTANT: { [key: string]: any } = {
	decorators:{
						complete : OddCompleteComponent,
						conditionalExpression : OddConditionalExpressionComponent,
						message : OddMessageComponent,
						dynamic : OddDynamicComponent,
						add : OddAddComponent,
						edit : OddEditComponent,
			  },
	validators:{
						complete : OddCompleteValidatorComponent,
						conditionalExpression : OddConditionalExpressionValidatorComponent,
						message : OddMessageValidatorComponent,
						dynamic : OddDynamicValidatorComponent,
						add : OddAddValidatorComponent,
			  },
	template_driven:{
						complete : OddCompleteTemplateDrivenComponent,
						conditionalExpression : OddConditionalExpressionTemplateDrivenComponent,
						message : OddMessageTemplateDrivenComponent,
						add : OddAddTemplateDrivenComponent,
			  },
}