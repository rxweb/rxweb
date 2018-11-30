import { AsciiCompleteComponent } from "src/assets/examples/reactive-form-validators/decorators/ascii/complete/ascii-complete.component";
import { AsciiCompleteTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/ascii/complete/ascii-complete.component";
import { AsciiCompleteValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/ascii/complete/ascii-complete.component";
import { AsciiConditionalExpressionComponent } from "src/assets/examples/reactive-form-validators/decorators/ascii/conditionalExpression/ascii-conditional-expression.component";
import { AsciiConditionalExpressionTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/ascii/conditionalExpression/ascii-conditional-expression.component";
import { AsciiConditionalExpressionValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/ascii/conditionalExpression/ascii-conditional-expression.component";
import { AsciiMessageComponent } from "src/assets/examples/reactive-form-validators/decorators/ascii/message/ascii-message.component";
import { AsciiMessageTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/ascii/message/ascii-message.component";
import { AsciiMessageValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/ascii/message/ascii-message.component";
import { AsciiDynamicComponent } from "src/assets/examples/reactive-form-validators/decorators/ascii/dynamic/ascii-dynamic.component";
import { AsciiDynamicValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/ascii/dynamic/ascii-dynamic.component";
import { AsciiAddComponent } from "src/assets/examples/reactive-form-validators/decorators/ascii/add/ascii-add.component";
import { AsciiAddTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/ascii/add/ascii-add.component";
import { AsciiAddValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/ascii/add/ascii-add.component";
import { AsciiEditComponent } from "src/assets/examples/reactive-form-validators/decorators/ascii/edit/ascii-edit.component";

export const ASCII_COMPONENT_EXAMPLE_CONSTANT: { [key: string]: any } = {
	decorators:{
						complete : AsciiCompleteComponent,
						conditionalExpression : AsciiConditionalExpressionComponent,
						message : AsciiMessageComponent,
						dynamic : AsciiDynamicComponent,
						add : AsciiAddComponent,
						edit : AsciiEditComponent,
			  },
	validators:{
						complete : AsciiCompleteValidatorComponent,
						conditionalExpression : AsciiConditionalExpressionValidatorComponent,
						message : AsciiMessageValidatorComponent,
						dynamic : AsciiDynamicValidatorComponent,
						add : AsciiAddValidatorComponent,
			  },
	template_driven:{
						complete : AsciiCompleteTemplateDrivenComponent,
						conditionalExpression : AsciiConditionalExpressionTemplateDrivenComponent,
						message : AsciiMessageTemplateDrivenComponent,
						add : AsciiAddTemplateDrivenComponent,
			  },
}