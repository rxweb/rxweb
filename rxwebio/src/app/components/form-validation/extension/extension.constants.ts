import { ExtensionCompleteComponent } from "src/assets/examples/reactive-form-validators/decorators/extension/complete/extension-complete.component";
import { ExtensionCompleteTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/extension/complete/extension-complete.component";
import { ExtensionCompleteTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/extension/complete/extension-complete.component";
import { ExtensionCompleteValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/extension/complete/extension-complete.component";
import { ExtensionExtensionsComponent } from "src/assets/examples/reactive-form-validators/decorators/extension/extensions/extension-extensions.component";
import { ExtensionExtensionsTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/extension/extensions/extension-extensions.component";
import { ExtensionExtensionsTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/extension/extensions/extension-extensions.component";
import { ExtensionExtensionsValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/extension/extensions/extension-extensions.component";
import { ExtensionConditionalExpressionComponent } from "src/assets/examples/reactive-form-validators/decorators/extension/conditionalExpression/extension-conditional-expression.component";
import { ExtensionConditionalExpressionTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/extension/conditionalExpression/extension-conditional-expression.component";
import { ExtensionConditionalExpressionTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/extension/conditionalExpression/extension-conditional-expression.component";
import { ExtensionConditionalExpressionValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/extension/conditionalExpression/extension-conditional-expression.component";
import { ExtensionMessageComponent } from "src/assets/examples/reactive-form-validators/decorators/extension/message/extension-message.component";
import { ExtensionMessageTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/extension/message/extension-message.component";
import { ExtensionMessageTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/extension/message/extension-message.component";
import { ExtensionMessageValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/extension/message/extension-message.component";
import { ExtensionDynamicComponent } from "src/assets/examples/reactive-form-validators/decorators/extension/dynamic/extension-dynamic.component";
import { ExtensionDynamicValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/extension/dynamic/extension-dynamic.component";
import { ExtensionAddComponent } from "src/assets/examples/reactive-form-validators/decorators/extension/add/extension-add.component";
import { ExtensionAddTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/extension/add/extension-add.component";
import { ExtensionAddTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/extension/add/extension-add.component";
import { ExtensionAddValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/extension/add/extension-add.component";
import { ExtensionEditComponent } from "src/assets/examples/reactive-form-validators/decorators/extension/edit/extension-edit.component";

export const EXTENSION_COMPONENT_EXAMPLE_CONSTANT: { [key: string]: any } = {
	decorators:{
						complete : ExtensionCompleteComponent,
						extensions : ExtensionExtensionsComponent,
						conditionalExpression : ExtensionConditionalExpressionComponent,
						message : ExtensionMessageComponent,
						dynamic : ExtensionDynamicComponent,
						add : ExtensionAddComponent,
						edit : ExtensionEditComponent,
			  },
	template_driven_validation_directives:{
						complete : ExtensionCompleteTemplateDrivenValidationDirectivesComponent,
						extensions : ExtensionExtensionsTemplateDrivenValidationDirectivesComponent,
						conditionalExpression : ExtensionConditionalExpressionTemplateDrivenValidationDirectivesComponent,
						message : ExtensionMessageTemplateDrivenValidationDirectivesComponent,
						add : ExtensionAddTemplateDrivenValidationDirectivesComponent,
			  },
	template_driven_validation_decorators:{
						complete : ExtensionCompleteTemplateDrivenValidationDecoratorsComponent,
						extensions : ExtensionExtensionsTemplateDrivenValidationDecoratorsComponent,
						conditionalExpression : ExtensionConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
						message : ExtensionMessageTemplateDrivenValidationDecoratorsComponent,
						add : ExtensionAddTemplateDrivenValidationDecoratorsComponent,
			  },
	validators:{
						complete : ExtensionCompleteValidatorComponent,
						extensions : ExtensionExtensionsValidatorComponent,
						conditionalExpression : ExtensionConditionalExpressionValidatorComponent,
						message : ExtensionMessageValidatorComponent,
						dynamic : ExtensionDynamicValidatorComponent,
						add : ExtensionAddValidatorComponent,
			  },
}