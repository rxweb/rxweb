import { RequiredCompleteComponent } from "src/assets/examples/reactive-form-validators/decorators/required/complete/required-complete.component";
import { RequiredCompleteTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/required/complete/required-complete.component";
import { RequiredCompleteValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/required/complete/required-complete.component";
import { RequiredConditionalExpressionComponent } from "src/assets/examples/reactive-form-validators/decorators/required/conditionalExpression/required-conditional-expression.component";
import { RequiredConditionalExpressionTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/required/conditionalExpression/required-conditional-expression.component";
import { RequiredConditionalExpressionValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/required/conditionalExpression/required-conditional-expression.component";
import { RequiredMessageComponent } from "src/assets/examples/reactive-form-validators/decorators/required/message/required-message.component";
import { RequiredMessageTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/required/message/required-message.component";
import { RequiredMessageValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/required/message/required-message.component";
import { RequiredDynamicComponent } from "src/assets/examples/reactive-form-validators/decorators/required/dynamic/required-dynamic.component";
import { RequiredDynamicValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/required/dynamic/required-dynamic.component";
import { RequiredAddComponent } from "src/assets/examples/reactive-form-validators/decorators/required/add/required-add.component";
import { RequiredAddTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/required/add/required-add.component";
import { RequiredAddValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/required/add/required-add.component";
import { RequiredEditComponent } from "src/assets/examples/reactive-form-validators/decorators/required/edit/required-edit.component";

export const REQUIRED_COMPONENT_EXAMPLE_CONSTANT: { [key: string]: any } = {
	decorators:{
						complete : RequiredCompleteComponent,
						conditionalExpression : RequiredConditionalExpressionComponent,
						message : RequiredMessageComponent,
						dynamic : RequiredDynamicComponent,
						add : RequiredAddComponent,
						edit : RequiredEditComponent,
			  },
	validators:{
						complete : RequiredCompleteValidatorComponent,
						conditionalExpression : RequiredConditionalExpressionValidatorComponent,
						message : RequiredMessageValidatorComponent,
						dynamic : RequiredDynamicValidatorComponent,
						add : RequiredAddValidatorComponent,
			  },
	template_driven:{
						complete : RequiredCompleteTemplateDrivenComponent,
						conditionalExpression : RequiredConditionalExpressionTemplateDrivenComponent,
						message : RequiredMessageTemplateDrivenComponent,
						add : RequiredAddTemplateDrivenComponent,
			  },
}