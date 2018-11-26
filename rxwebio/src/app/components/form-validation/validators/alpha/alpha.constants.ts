import { AlphaCompleteComponent } from "src/assets/examples/reactive-form-validators/decorators/alpha/complete/alpha-complete.component";
import { AlphaCompleteTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/alpha/complete/alpha-complete.component";
import { AlphaCompleteValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/alpha/complete/alpha-complete.component";
import { AlphaConditionalExpressionComponent } from "src/assets/examples/reactive-form-validators/decorators/alpha/conditionalExpression/alpha-conditional-expression.component";
import { AlphaConditionalExpressionTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/alpha/conditionalExpression/alpha-conditional-expression.component";
import { AlphaConditionalExpressionValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/alpha/conditionalExpression/alpha-conditional-expression.component";
import { AlphaAllowWhiteSpaceComponent } from "src/assets/examples/reactive-form-validators/decorators/alpha/allowWhiteSpace/alpha-allow-white-space.component";
import { AlphaAllowWhiteSpaceTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/alpha/allowWhiteSpace/alpha-allow-white-space.component";
import { AlphaAllowWhiteSpaceValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/alpha/allowWhiteSpace/alpha-allow-white-space.component";
import { AlphaMessageComponent } from "src/assets/examples/reactive-form-validators/decorators/alpha/message/alpha-message.component";
import { AlphaMessageTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/alpha/message/alpha-message.component";
import { AlphaMessageValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/alpha/message/alpha-message.component";
import { AlphaDynamicComponent } from "src/assets/examples/reactive-form-validators/decorators/alpha/dynamic/alpha-dynamic.component";
import { AlphaDynamicValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/alpha/dynamic/alpha-dynamic.component";
import { AlphaAddComponent } from "src/assets/examples/reactive-form-validators/decorators/alpha/add/alpha-add.component";
import { AlphaAddTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/alpha/add/alpha-add.component";
import { AlphaAddValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/alpha/add/alpha-add.component";
import { AlphaEditComponent } from "src/assets/examples/reactive-form-validators/decorators/alpha/edit/alpha-edit.component";

export const ALPHA_COMPONENT_EXAMPLE_CONSTANT: { [key: string]: any } = {
	decorators:{
						complete : AlphaCompleteComponent,
						conditionalExpression : AlphaConditionalExpressionComponent,
						allowWhiteSpace : AlphaAllowWhiteSpaceComponent,
						message : AlphaMessageComponent,
						dynamic : AlphaDynamicComponent,
						add : AlphaAddComponent,
						edit : AlphaEditComponent,
			  },
	validators:{
						complete : AlphaCompleteValidatorComponent,
						conditionalExpression : AlphaConditionalExpressionValidatorComponent,
						allowWhiteSpace : AlphaAllowWhiteSpaceValidatorComponent,
						message : AlphaMessageValidatorComponent,
						dynamic : AlphaDynamicValidatorComponent,
						add : AlphaAddValidatorComponent,
			  },
	template_driven:{
						complete : AlphaCompleteTemplateDrivenComponent,
						conditionalExpression : AlphaConditionalExpressionTemplateDrivenComponent,
						allowWhiteSpace : AlphaAllowWhiteSpaceTemplateDrivenComponent,
						message : AlphaMessageTemplateDrivenComponent,
						add : AlphaAddTemplateDrivenComponent,
			  },
}