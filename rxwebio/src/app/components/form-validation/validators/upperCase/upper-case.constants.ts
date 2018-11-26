import { UpperCaseCompleteComponent } from "src/assets/examples/reactive-form-validators/decorators/upperCase/complete/upper-case-complete.component";
import { UpperCaseCompleteTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/upperCase/complete/upper-case-complete.component";
import { UpperCaseCompleteValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/upperCase/complete/upper-case-complete.component";
import { UpperCaseConditionalExpressionComponent } from "src/assets/examples/reactive-form-validators/decorators/upperCase/conditionalExpression/upper-case-conditional-expression.component";
import { UpperCaseConditionalExpressionTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/upperCase/conditionalExpression/upper-case-conditional-expression.component";
import { UpperCaseConditionalExpressionValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/upperCase/conditionalExpression/upper-case-conditional-expression.component";
import { UpperCaseMessageComponent } from "src/assets/examples/reactive-form-validators/decorators/upperCase/message/upper-case-message.component";
import { UpperCaseMessageTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/upperCase/message/upper-case-message.component";
import { UpperCaseMessageValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/upperCase/message/upper-case-message.component";
import { UpperCaseDynamicComponent } from "src/assets/examples/reactive-form-validators/decorators/upperCase/dynamic/upper-case-dynamic.component";
import { UpperCaseDynamicValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/upperCase/dynamic/upper-case-dynamic.component";
import { UpperCaseAddComponent } from "src/assets/examples/reactive-form-validators/decorators/upperCase/add/upper-case-add.component";
import { UpperCaseAddTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/upperCase/add/upper-case-add.component";
import { UpperCaseAddValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/upperCase/add/upper-case-add.component";
import { UpperCaseEditComponent } from "src/assets/examples/reactive-form-validators/decorators/upperCase/edit/upper-case-edit.component";

export const UPPER_CASE_COMPONENT_EXAMPLE_CONSTANT: { [key: string]: any } = {
	decorators:{
						complete : UpperCaseCompleteComponent,
						conditionalExpression : UpperCaseConditionalExpressionComponent,
						message : UpperCaseMessageComponent,
						dynamic : UpperCaseDynamicComponent,
						add : UpperCaseAddComponent,
						edit : UpperCaseEditComponent,
			  },
	validators:{
						complete : UpperCaseCompleteValidatorComponent,
						conditionalExpression : UpperCaseConditionalExpressionValidatorComponent,
						message : UpperCaseMessageValidatorComponent,
						dynamic : UpperCaseDynamicValidatorComponent,
						add : UpperCaseAddValidatorComponent,
			  },
	template_driven:{
						complete : UpperCaseCompleteTemplateDrivenComponent,
						conditionalExpression : UpperCaseConditionalExpressionTemplateDrivenComponent,
						message : UpperCaseMessageTemplateDrivenComponent,
						add : UpperCaseAddTemplateDrivenComponent,
			  },
}