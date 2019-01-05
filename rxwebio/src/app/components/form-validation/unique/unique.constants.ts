import { UniqueCompleteComponent } from "src/assets/examples/reactive-form-validators/decorators/unique/complete/unique-complete.component";
import { UniqueMessageComponent } from "src/assets/examples/reactive-form-validators/decorators/unique/message/unique-message.component";
import { UniqueAddComponent } from "src/assets/examples/reactive-form-validators/decorators/unique/add/unique-add.component";
import { UniqueCompleteValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/unique/complete/unique-complete.component";
import { UniqueMessageValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/unique/message/unique-message.component";
import { UniqueAddValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/unique/add/unique-add.component";

export const UNIQUE_COMPONENT_EXAMPLE_CONSTANT: { [key: string]: any } = {
	decorators:{
						complete : UniqueCompleteComponent,
						message : UniqueMessageComponent,
						add : UniqueAddComponent,
			  },
	validators:{
						complete : UniqueCompleteValidatorComponent,
						message : UniqueMessageValidatorComponent,
						add : UniqueAddValidatorComponent,
			  },
	// template_driven_validation_directives:{
	// 					complete : UniqueCompleteTemplateDrivenValidationDirectivesComponent,
	// 					conditionalExpression : UniqueConditionalExpressionTemplateDrivenValidationDirectivesComponent,
	// 					additionalValidation : UniqueAdditionalValidationTemplateDrivenValidationDirectivesComponent,
	// 					message : UniqueMessageTemplateDrivenValidationDirectivesComponent,
	// 					add : UniqueAddTemplateDrivenValidationDirectivesComponent,
	// 		  },
	// template_driven_validation_decorators:{
	// 					complete : UniqueCompleteTemplateDrivenValidationDecoratorsComponent,
	// 					conditionalExpression : UniqueConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	// 					additionalValidation : UniqueAdditionalValidationTemplateDrivenValidationDecoratorsComponent,
	// 					message : UniqueMessageTemplateDrivenValidationDecoratorsComponent,
	// 					add : UniqueAddTemplateDrivenValidationDecoratorsComponent,
	// 		  },
}