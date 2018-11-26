import { PasswordCompleteComponent } from "src/assets/examples/reactive-form-validators/decorators/password/complete/password-complete.component";
import { PasswordCompleteTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/password/complete/password-complete.component";
import { PasswordCompleteValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/password/complete/password-complete.component";
import { PasswordValidationComponent } from "src/assets/examples/reactive-form-validators/decorators/password/validation/password-validation.component";
import { PasswordValidationTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/password/validation/password-validation.component";
import { PasswordValidationValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/password/validation/password-validation.component";
import { PasswordMessageComponent } from "src/assets/examples/reactive-form-validators/decorators/password/message/password-message.component";
import { PasswordMessageTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/password/message/password-message.component";
import { PasswordMessageValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/password/message/password-message.component";
import { PasswordDynamicComponent } from "src/assets/examples/reactive-form-validators/decorators/password/dynamic/password-dynamic.component";
import { PasswordDynamicValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/password/dynamic/password-dynamic.component";
import { PasswordAddComponent } from "src/assets/examples/reactive-form-validators/decorators/password/add/password-add.component";
import { PasswordAddTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/password/add/password-add.component";
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
	template_driven:{
						complete : PasswordCompleteTemplateDrivenComponent,
						validation : PasswordValidationTemplateDrivenComponent,
						message : PasswordMessageTemplateDrivenComponent,
						add : PasswordAddTemplateDrivenComponent,
			  },
}