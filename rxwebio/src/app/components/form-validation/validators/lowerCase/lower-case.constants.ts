import { LowerCaseCompleteComponent } from "src/assets/examples/reactive-form-validators/decorators/lowerCase/complete/lower-case-complete.component";
import { LowerCaseCompleteTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/lowerCase/complete/lower-case-complete.component";
import { LowerCaseCompleteValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/lowerCase/complete/lower-case-complete.component";
import { LowerCaseConditionalExpressionComponent } from "src/assets/examples/reactive-form-validators/decorators/lowerCase/conditionalExpression/lower-case-conditional-expression.component";
import { LowerCaseConditionalExpressionTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/lowerCase/conditionalExpression/lower-case-conditional-expression.component";
import { LowerCaseConditionalExpressionValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/lowerCase/conditionalExpression/lower-case-conditional-expression.component";
import { LowerCaseMessageComponent } from "src/assets/examples/reactive-form-validators/decorators/lowerCase/message/lower-case-message.component";
import { LowerCaseMessageTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/lowerCase/message/lower-case-message.component";
import { LowerCaseMessageValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/lowerCase/message/lower-case-message.component";
import { LowerCaseDynamicComponent } from "src/assets/examples/reactive-form-validators/decorators/lowerCase/dynamic/lower-case-dynamic.component";
import { LowerCaseDynamicValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/lowerCase/dynamic/lower-case-dynamic.component";
import { LowerCaseAddComponent } from "src/assets/examples/reactive-form-validators/decorators/lowerCase/add/lower-case-add.component";
import { LowerCaseAddTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/lowerCase/add/lower-case-add.component";
import { LowerCaseAddValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/lowerCase/add/lower-case-add.component";
import { LowerCaseEditComponent } from "src/assets/examples/reactive-form-validators/decorators/lowerCase/edit/lower-case-edit.component";

export const LOWER_CASE_COMPONENT_EXAMPLE_CONSTANT: { [key: string]: any } = {
	decorators:{
						complete : LowerCaseCompleteComponent,
						conditionalExpression : LowerCaseConditionalExpressionComponent,
						message : LowerCaseMessageComponent,
						dynamic : LowerCaseDynamicComponent,
						add : LowerCaseAddComponent,
						edit : LowerCaseEditComponent,
			  },
	validators:{
						complete : LowerCaseCompleteValidatorComponent,
						conditionalExpression : LowerCaseConditionalExpressionValidatorComponent,
						message : LowerCaseMessageValidatorComponent,
						dynamic : LowerCaseDynamicValidatorComponent,
						add : LowerCaseAddValidatorComponent,
			  },
	template_driven:{
						complete : LowerCaseCompleteTemplateDrivenComponent,
						conditionalExpression : LowerCaseConditionalExpressionTemplateDrivenComponent,
						message : LowerCaseMessageTemplateDrivenComponent,
						add : LowerCaseAddTemplateDrivenComponent,
			  },
}