import { AlphaNumericCompleteComponent } from "src/assets/examples/reactive-form-validators/decorators/alphaNumeric/complete/alpha-numeric-complete.component";
import { AlphaNumericCompleteTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/alphaNumeric/complete/alpha-numeric-complete.component";
import { AlphaNumericCompleteValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/alphaNumeric/complete/alpha-numeric-complete.component";
import { AlphaNumericAllowWhiteSpaceComponent } from "src/assets/examples/reactive-form-validators/decorators/alphaNumeric/allowWhiteSpace/alpha-numeric-allow-white-space.component";
import { AlphaNumericAllowWhiteSpaceTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/alphaNumeric/allowWhiteSpace/alpha-numeric-allow-white-space.component";
import { AlphaNumericAllowWhiteSpaceValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/alphaNumeric/allowWhiteSpace/alpha-numeric-allow-white-space.component";
import { AlphaNumericMessageComponent } from "src/assets/examples/reactive-form-validators/decorators/alphaNumeric/message/alpha-numeric-message.component";
import { AlphaNumericMessageTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/alphaNumeric/message/alpha-numeric-message.component";
import { AlphaNumericMessageValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/alphaNumeric/message/alpha-numeric-message.component";
import { AlphaNumericConditionalExpressionComponent } from "src/assets/examples/reactive-form-validators/decorators/alphaNumeric/conditionalExpression/alpha-numeric-conditional-expression.component";
import { AlphaNumericConditionalExpressionTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/alphaNumeric/conditionalExpression/alpha-numeric-conditional-expression.component";
import { AlphaNumericConditionalExpressionValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/alphaNumeric/conditionalExpression/alpha-numeric-conditional-expression.component";
import { AlphaNumericDynamicComponent } from "src/assets/examples/reactive-form-validators/decorators/alphaNumeric/dynamic/alpha-numeric-dynamic.component";
import { AlphaNumericDynamicValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/alphaNumeric/dynamic/alpha-numeric-dynamic.component";
import { AlphaNumericAddComponent } from "src/assets/examples/reactive-form-validators/decorators/alphaNumeric/add/alpha-numeric-add.component";
import { AlphaNumericAddTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/alphaNumeric/add/alpha-numeric-add.component";
import { AlphaNumericAddValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/alphaNumeric/add/alpha-numeric-add.component";
import { AlphaNumericEditComponent } from "src/assets/examples/reactive-form-validators/decorators/alphaNumeric/edit/alpha-numeric-edit.component";

export const ALPHA_NUMERIC_COMPONENT_EXAMPLE_CONSTANT: { [key: string]: any } = {
	decorators:{
						complete : AlphaNumericCompleteComponent,
						allowWhiteSpace : AlphaNumericAllowWhiteSpaceComponent,
						message : AlphaNumericMessageComponent,
						conditionalExpression : AlphaNumericConditionalExpressionComponent,
						dynamic : AlphaNumericDynamicComponent,
						add : AlphaNumericAddComponent,
						edit : AlphaNumericEditComponent,
			  },
	validators:{
						complete : AlphaNumericCompleteValidatorComponent,
						allowWhiteSpace : AlphaNumericAllowWhiteSpaceValidatorComponent,
						message : AlphaNumericMessageValidatorComponent,
						conditionalExpression : AlphaNumericConditionalExpressionValidatorComponent,
						dynamic : AlphaNumericDynamicValidatorComponent,
						add : AlphaNumericAddValidatorComponent,
			  },
	template_driven:{
						complete : AlphaNumericCompleteTemplateDrivenComponent,
						allowWhiteSpace : AlphaNumericAllowWhiteSpaceTemplateDrivenComponent,
						message : AlphaNumericMessageTemplateDrivenComponent,
						conditionalExpression : AlphaNumericConditionalExpressionTemplateDrivenComponent,
						add : AlphaNumericAddTemplateDrivenComponent,
			  },
}