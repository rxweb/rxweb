import { PortCompleteComponent } from "src/assets/examples/reactive-form-validators/decorators/port/complete/port-complete.component";
import { PortCompleteTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/port/complete/port-complete.component";
import { PortCompleteValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/port/complete/port-complete.component";
import { PortConditionalExpressionComponent } from "src/assets/examples/reactive-form-validators/decorators/port/conditionalExpression/port-conditional-expression.component";
import { PortConditionalExpressionTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/port/conditionalExpression/port-conditional-expression.component";
import { PortConditionalExpressionValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/port/conditionalExpression/port-conditional-expression.component";
import { PortMessageComponent } from "src/assets/examples/reactive-form-validators/decorators/port/message/port-message.component";
import { PortMessageTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/port/message/port-message.component";
import { PortMessageValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/port/message/port-message.component";
import { PortDynamicComponent } from "src/assets/examples/reactive-form-validators/decorators/port/dynamic/port-dynamic.component";
import { PortDynamicValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/port/dynamic/port-dynamic.component";
import { PortAddComponent } from "src/assets/examples/reactive-form-validators/decorators/port/add/port-add.component";
import { PortAddTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/port/add/port-add.component";
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
	validators:{
						complete : PortCompleteValidatorComponent,
						conditionalExpression : PortConditionalExpressionValidatorComponent,
						message : PortMessageValidatorComponent,
						dynamic : PortDynamicValidatorComponent,
						add : PortAddValidatorComponent,
			  },
	template_driven:{
						complete : PortCompleteTemplateDrivenComponent,
						conditionalExpression : PortConditionalExpressionTemplateDrivenComponent,
						message : PortMessageTemplateDrivenComponent,
						add : PortAddTemplateDrivenComponent,
			  },
}