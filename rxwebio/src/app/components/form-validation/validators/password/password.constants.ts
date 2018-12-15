import { PasswordCompleteComponent } from "src/assets/examples/reactive-form-validators/decorators/password/complete/password-complete.component";
import { PasswordCompleteTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/password/complete/password-complete.component";
import { PasswordCompleteTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/password/complete/password-complete.component";
import { PasswordCompleteValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/password/complete/password-complete.component";
import { PasswordValidationComponent } from "src/assets/examples/reactive-form-validators/decorators/password/validation/password-validation.component";
import { PasswordValidationTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/password/validation/password-validation.component";
import { PasswordValidationTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/password/validation/password-validation.component";
import { PasswordValidationValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/password/validation/password-validation.component";
import { PasswordMessageComponent } from "src/assets/examples/reactive-form-validators/decorators/password/message/password-message.component";
import { PasswordMessageTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/password/message/password-message.component";
import { PasswordMessageTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/password/message/password-message.component";
import { PasswordMessageValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/password/message/password-message.component";
import { PasswordDynamicComponent } from "src/assets/examples/reactive-form-validators/decorators/password/dynamic/password-dynamic.component";
import { PasswordDynamicValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/password/dynamic/password-dynamic.component";
import { PasswordAddComponent } from "src/assets/examples/reactive-form-validators/decorators/password/add/password-add.component";
import { PasswordAddTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/password/add/password-add.component";
import { PasswordAddTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/password/add/password-add.component";
import { PasswordAddValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/password/add/password-add.component";
import { PasswordEditComponent } from "src/assets/examples/reactive-form-validators/decorators/password/edit/password-edit.component";

export const PASSWORD_COMPONENT_EXAMPLE_CONSTANT: { [key: string]: any } = {
	decorators:{
						complete : PasswordCompleteComponent,
						validation : PasswordValidationComponent,
						message : PasswordMessageComponent,
						dynamic : PasswordDynamicComponent,
						add : PasswordAddComponent,
						edit : PasswordEditComponent,
			  },
	validators:{
						complete : PasswordCompleteValidatorComponent,
						validation : PasswordValidationValidatorComponent,
						message : PasswordMessageValidatorComponent,
						dynamic : PasswordDynamicValidatorComponent,
						add : PasswordAddValidatorComponent,
			  },
	template_driven_validation_directives:{
						complete : PasswordCompleteTemplateDrivenValidationDirectivesComponent,
						validation : PasswordValidationTemplateDrivenValidationDirectivesComponent,
						message : PasswordMessageTemplateDrivenValidationDirectivesComponent,
						add : PasswordAddTemplateDrivenValidationDirectivesComponent,
			  },
	template_driven_validation_decorators:{
						complete : PasswordCompleteTemplateDrivenValidationDecoratorsComponent,
						validation : PasswordValidationTemplateDrivenValidationDecoratorsComponent,
						message : PasswordMessageTemplateDrivenValidationDecoratorsComponent,
						add : PasswordAddTemplateDrivenValidationDecoratorsComponent,
			  },
}