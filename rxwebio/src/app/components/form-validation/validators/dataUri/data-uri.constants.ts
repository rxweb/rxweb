import { DataUriCompleteComponent } from "src/assets/examples/reactive-form-validators/decorators/dataUri/complete/data-uri-complete.component";
import { DataUriCompleteTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/dataUri/complete/data-uri-complete.component";
import { DataUriCompleteTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/dataUri/complete/data-uri-complete.component";
import { DataUriCompleteValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/dataUri/complete/data-uri-complete.component";
import { DataUriConditionalExpressionComponent } from "src/assets/examples/reactive-form-validators/decorators/dataUri/conditionalExpression/data-uri-conditional-expression.component";
import { DataUriConditionalExpressionTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/dataUri/conditionalExpression/data-uri-conditional-expression.component";
import { DataUriConditionalExpressionTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/dataUri/conditionalExpression/data-uri-conditional-expression.component";
import { DataUriConditionalExpressionValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/dataUri/conditionalExpression/data-uri-conditional-expression.component";
import { DataUriMessageComponent } from "src/assets/examples/reactive-form-validators/decorators/dataUri/message/data-uri-message.component";
import { DataUriMessageTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/dataUri/message/data-uri-message.component";
import { DataUriMessageTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/dataUri/message/data-uri-message.component";
import { DataUriMessageValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/dataUri/message/data-uri-message.component";
import { DataUriDynamicComponent } from "src/assets/examples/reactive-form-validators/decorators/dataUri/dynamic/data-uri-dynamic.component";
import { DataUriDynamicValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/dataUri/dynamic/data-uri-dynamic.component";
import { DataUriAddComponent } from "src/assets/examples/reactive-form-validators/decorators/dataUri/add/data-uri-add.component";
import { DataUriAddTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/dataUri/add/data-uri-add.component";
import { DataUriAddTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/dataUri/add/data-uri-add.component";
import { DataUriAddValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/dataUri/add/data-uri-add.component";
import { DataUriEditComponent } from "src/assets/examples/reactive-form-validators/decorators/dataUri/edit/data-uri-edit.component";

export const DATA_URI_COMPONENT_EXAMPLE_CONSTANT: { [key: string]: any } = {
	decorators:{
						complete : DataUriCompleteComponent,
						conditionalExpression : DataUriConditionalExpressionComponent,
						message : DataUriMessageComponent,
						dynamic : DataUriDynamicComponent,
						add : DataUriAddComponent,
						edit : DataUriEditComponent,
			  },
	validators:{
						complete : DataUriCompleteValidatorComponent,
						conditionalExpression : DataUriConditionalExpressionValidatorComponent,
						message : DataUriMessageValidatorComponent,
						dynamic : DataUriDynamicValidatorComponent,
						add : DataUriAddValidatorComponent,
			  },
	template_driven_validation_directives:{
						complete : DataUriCompleteTemplateDrivenValidationDirectivesComponent,
						conditionalExpression : DataUriConditionalExpressionTemplateDrivenValidationDirectivesComponent,
						message : DataUriMessageTemplateDrivenValidationDirectivesComponent,
						add : DataUriAddTemplateDrivenValidationDirectivesComponent,
			  },
	template_driven_validation_decorators:{
						complete : DataUriCompleteTemplateDrivenValidationDecoratorsComponent,
						conditionalExpression : DataUriConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
						message : DataUriMessageTemplateDrivenValidationDecoratorsComponent,
						add : DataUriAddTemplateDrivenValidationDecoratorsComponent,
			  },
}