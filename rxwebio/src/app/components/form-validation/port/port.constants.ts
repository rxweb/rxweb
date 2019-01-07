import { PortCompleteComponent } from "src/assets/examples/reactive-form-validators/decorators/port/complete/port-complete.component";
import { PortCompleteTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/port/complete/port-complete.component";
import { PortCompleteTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/port/complete/port-complete.component";
import { PortCompleteValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/port/complete/port-complete.component";
import { PortConditionalExpressionComponent } from "src/assets/examples/reactive-form-validators/decorators/port/conditionalExpression/port-conditional-expression.component";
import { PortConditionalExpressionTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/port/conditionalExpression/port-conditional-expression.component";
import { PortConditionalExpressionTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/port/conditionalExpression/port-conditional-expression.component";
import { PortConditionalExpressionValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/port/conditionalExpression/port-conditional-expression.component";
import { PortMessageComponent } from "src/assets/examples/reactive-form-validators/decorators/port/message/port-message.component";
import { PortMessageTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/port/message/port-message.component";
import { PortMessageTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/port/message/port-message.component";
import { PortMessageValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/port/message/port-message.component";
import { PortDynamicComponent } from "src/assets/examples/reactive-form-validators/decorators/port/dynamic/port-dynamic.component";
import { PortDynamicValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/port/dynamic/port-dynamic.component";
import { PortAddComponent } from "src/assets/examples/reactive-form-validators/decorators/port/add/port-add.component";
import { PortAddTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/port/add/port-add.component";
import { PortAddTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/port/add/port-add.component";
import { PortAddValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/port/add/port-add.component";
import { PortEditComponent } from "src/assets/examples/reactive-form-validators/decorators/port/edit/port-edit.component";

export const PORT_COMPONENT_EXAMPLE_CONSTANT: { [key: string]: any } = {
	decorators:{
						complete : PortCompleteComponent,
						conditionalExpression : PortConditionalExpressionComponent,
						message : PortMessageComponent,
						dynamic : PortDynamicComponent,
						add : PortAddComponent,
						edit : PortEditComponent,
			  },
	template_driven_validation_directives:{
						complete : PortCompleteTemplateDrivenValidationDirectivesComponent,
						conditionalExpression : PortConditionalExpressionTemplateDrivenValidationDirectivesComponent,
						message : PortMessageTemplateDrivenValidationDirectivesComponent,
						add : PortAddTemplateDrivenValidationDirectivesComponent,
			  },
	template_driven_validation_decorators:{
						complete : PortCompleteTemplateDrivenValidationDecoratorsComponent,
						conditionalExpression : PortConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
						message : PortMessageTemplateDrivenValidationDecoratorsComponent,
						add : PortAddTemplateDrivenValidationDecoratorsComponent,
			  },
	validators:{
						complete : PortCompleteValidatorComponent,
						conditionalExpression : PortConditionalExpressionValidatorComponent,
						message : PortMessageValidatorComponent,
						dynamic : PortDynamicValidatorComponent,
						add : PortAddValidatorComponent,
			  },
}