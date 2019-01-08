import { LowerCaseCompleteComponent } from "src/assets/examples/reactive-form-validators/decorators/lowerCase/complete/lower-case-complete.component";
import { LowerCaseCompleteTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/lowerCase/complete/lower-case-complete.component";
import { LowerCaseCompleteTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/lowerCase/complete/lower-case-complete.component";
import { LowerCaseCompleteValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/lowerCase/complete/lower-case-complete.component";
import { LowerCaseConditionalExpressionComponent } from "src/assets/examples/reactive-form-validators/decorators/lowerCase/conditionalExpression/lower-case-conditional-expression.component";
import { LowerCaseConditionalExpressionTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/lowerCase/conditionalExpression/lower-case-conditional-expression.component";
import { LowerCaseConditionalExpressionTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/lowerCase/conditionalExpression/lower-case-conditional-expression.component";
import { LowerCaseConditionalExpressionValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/lowerCase/conditionalExpression/lower-case-conditional-expression.component";
import { LowerCaseMessageComponent } from "src/assets/examples/reactive-form-validators/decorators/lowerCase/message/lower-case-message.component";
import { LowerCaseMessageTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/lowerCase/message/lower-case-message.component";
import { LowerCaseMessageTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/lowerCase/message/lower-case-message.component";
import { LowerCaseMessageValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/lowerCase/message/lower-case-message.component";
import { LowerCaseDynamicComponent } from "src/assets/examples/reactive-form-validators/decorators/lowerCase/dynamic/lower-case-dynamic.component";
import { LowerCaseDynamicValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/lowerCase/dynamic/lower-case-dynamic.component";
import { LowerCaseAddComponent } from "src/assets/examples/reactive-form-validators/decorators/lowerCase/add/lower-case-add.component";
import { LowerCaseAddTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/lowerCase/add/lower-case-add.component";
import { LowerCaseAddTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/lowerCase/add/lower-case-add.component";
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
	template_driven_validation_directives:{
						complete : LowerCaseCompleteTemplateDrivenValidationDirectivesComponent,
						conditionalExpression : LowerCaseConditionalExpressionTemplateDrivenValidationDirectivesComponent,
						message : LowerCaseMessageTemplateDrivenValidationDirectivesComponent,
						add : LowerCaseAddTemplateDrivenValidationDirectivesComponent,
			  },
	template_driven_validation_decorators:{
						complete : LowerCaseCompleteTemplateDrivenValidationDecoratorsComponent,
						conditionalExpression : LowerCaseConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
						message : LowerCaseMessageTemplateDrivenValidationDecoratorsComponent,
						add : LowerCaseAddTemplateDrivenValidationDecoratorsComponent,
			  },
	validators:{
						complete : LowerCaseCompleteValidatorComponent,
						conditionalExpression : LowerCaseConditionalExpressionValidatorComponent,
						message : LowerCaseMessageValidatorComponent,
						dynamic : LowerCaseDynamicValidatorComponent,
						add : LowerCaseAddValidatorComponent,
			  },
}