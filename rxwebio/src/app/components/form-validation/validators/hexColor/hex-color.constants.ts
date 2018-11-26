import { HexColorCompleteComponent } from "src/assets/examples/reactive-form-validators/decorators/hexColor/complete/hex-color-complete.component";
import { HexColorCompleteTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/hexColor/complete/hex-color-complete.component";
import { HexColorCompleteValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/hexColor/complete/hex-color-complete.component";
import { HexColorConditionalExpressionComponent } from "src/assets/examples/reactive-form-validators/decorators/hexColor/conditionalExpression/hex-color-conditional-expression.component";
import { HexColorConditionalExpressionTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/hexColor/conditionalExpression/hex-color-conditional-expression.component";
import { HexColorConditionalExpressionValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/hexColor/conditionalExpression/hex-color-conditional-expression.component";
import { HexColorMessageComponent } from "src/assets/examples/reactive-form-validators/decorators/hexColor/message/hex-color-message.component";
import { HexColorMessageTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/hexColor/message/hex-color-message.component";
import { HexColorMessageValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/hexColor/message/hex-color-message.component";
import { HexColorDynamicComponent } from "src/assets/examples/reactive-form-validators/decorators/hexColor/dynamic/hex-color-dynamic.component";
import { HexColorDynamicValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/hexColor/dynamic/hex-color-dynamic.component";
import { HexColorAddComponent } from "src/assets/examples/reactive-form-validators/decorators/hexColor/add/hex-color-add.component";
import { HexColorAddTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/hexColor/add/hex-color-add.component";
import { HexColorAddValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/hexColor/add/hex-color-add.component";
import { HexColorEditComponent } from "src/assets/examples/reactive-form-validators/decorators/hexColor/edit/hex-color-edit.component";

export const HEX_COLOR_COMPONENT_EXAMPLE_CONSTANT: { [key: string]: any } = {
	decorators:{
						complete : HexColorCompleteComponent,
						conditionalExpression : HexColorConditionalExpressionComponent,
						message : HexColorMessageComponent,
						dynamic : HexColorDynamicComponent,
						add : HexColorAddComponent,
						edit : HexColorEditComponent,
			  },
	validators:{
						complete : HexColorCompleteValidatorComponent,
						conditionalExpression : HexColorConditionalExpressionValidatorComponent,
						message : HexColorMessageValidatorComponent,
						dynamic : HexColorDynamicValidatorComponent,
						add : HexColorAddValidatorComponent,
			  },
	template_driven:{
						complete : HexColorCompleteTemplateDrivenComponent,
						conditionalExpression : HexColorConditionalExpressionTemplateDrivenComponent,
						message : HexColorMessageTemplateDrivenComponent,
						add : HexColorAddTemplateDrivenComponent,
			  },
}