import { NumericCompleteComponent } from "src/assets/examples/reactive-form-validators/decorators/numeric/complete/numeric-complete.component";
import { NumericCompleteTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/numeric/complete/numeric-complete.component";
import { NumericCompleteValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/numeric/complete/numeric-complete.component";
import { NumericAcceptValueComponent } from "src/assets/examples/reactive-form-validators/decorators/numeric/acceptValue/numeric-accept-value.component";
import { NumericAcceptValueTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/numeric/acceptValue/numeric-accept-value.component";
import { NumericAcceptValueValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/numeric/acceptValue/numeric-accept-value.component";
import { NumericMessageComponent } from "src/assets/examples/reactive-form-validators/decorators/numeric/message/numeric-message.component";
import { NumericMessageTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/numeric/message/numeric-message.component";
import { NumericMessageValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/numeric/message/numeric-message.component";
import { NumericAllowDecimalComponent } from "src/assets/examples/reactive-form-validators/decorators/numeric/allowDecimal/numeric-allow-decimal.component";
import { NumericAllowDecimalTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/numeric/allowDecimal/numeric-allow-decimal.component";
import { NumericAllowDecimalValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/numeric/allowDecimal/numeric-allow-decimal.component";
import { NumericConditionalExpressionComponent } from "src/assets/examples/reactive-form-validators/decorators/numeric/conditionalExpression/numeric-conditional-expression.component";
import { NumericConditionalExpressionTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/numeric/conditionalExpression/numeric-conditional-expression.component";
import { NumericConditionalExpressionValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/numeric/conditionalExpression/numeric-conditional-expression.component";
import { NumericDynamicComponent } from "src/assets/examples/reactive-form-validators/decorators/numeric/dynamic/numeric-dynamic.component";
import { NumericDynamicValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/numeric/dynamic/numeric-dynamic.component";
import { NumericAddComponent } from "src/assets/examples/reactive-form-validators/decorators/numeric/add/numeric-add.component";
import { NumericAddTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/numeric/add/numeric-add.component";
import { NumericAddValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/numeric/add/numeric-add.component";
import { NumericEditComponent } from "src/assets/examples/reactive-form-validators/decorators/numeric/edit/numeric-edit.component";

export const NUMERIC_COMPONENT_EXAMPLE_CONSTANT: { [key: string]: any } = {
	decorators:{
						complete : NumericCompleteComponent,
						acceptValue : NumericAcceptValueComponent,
						message : NumericMessageComponent,
						allowDecimal : NumericAllowDecimalComponent,
						conditionalExpression : NumericConditionalExpressionComponent,
						dynamic : NumericDynamicComponent,
						add : NumericAddComponent,
						edit : NumericEditComponent,
			  },
	validators:{
						complete : NumericCompleteValidatorComponent,
						acceptValue : NumericAcceptValueValidatorComponent,
						message : NumericMessageValidatorComponent,
						allowDecimal : NumericAllowDecimalValidatorComponent,
						conditionalExpression : NumericConditionalExpressionValidatorComponent,
						dynamic : NumericDynamicValidatorComponent,
						add : NumericAddValidatorComponent,
			  },
	template_driven:{
						complete : NumericCompleteTemplateDrivenComponent,
						acceptValue : NumericAcceptValueTemplateDrivenComponent,
						message : NumericMessageTemplateDrivenComponent,
						allowDecimal : NumericAllowDecimalTemplateDrivenComponent,
						conditionalExpression : NumericConditionalExpressionTemplateDrivenComponent,
						add : NumericAddTemplateDrivenComponent,
			  },
}