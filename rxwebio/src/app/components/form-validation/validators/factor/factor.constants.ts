import { FactorCompleteComponent } from "src/assets/examples/reactive-form-validators/decorators/factor/complete/factor-complete.component";
import { FactorCompleteTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/factor/complete/factor-complete.component";
import { FactorCompleteValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/factor/complete/factor-complete.component";
import { FactorFieldNameComponent } from "src/assets/examples/reactive-form-validators/decorators/factor/fieldName/factor-field-name.component";
import { FactorFieldNameTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/factor/fieldName/factor-field-name.component";
import { FactorFieldNameValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/factor/fieldName/factor-field-name.component";
import { FactorConditionalExpressionComponent } from "src/assets/examples/reactive-form-validators/decorators/factor/conditionalExpression/factor-conditional-expression.component";
import { FactorConditionalExpressionTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/factor/conditionalExpression/factor-conditional-expression.component";
import { FactorConditionalExpressionValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/factor/conditionalExpression/factor-conditional-expression.component";
import { FactorDividendComponent } from "src/assets/examples/reactive-form-validators/decorators/factor/dividend/factor-dividend.component";
import { FactorDividendTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/factor/dividend/factor-dividend.component";
import { FactorDividendValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/factor/dividend/factor-dividend.component";
import { FactorMessageComponent } from "src/assets/examples/reactive-form-validators/decorators/factor/message/factor-message.component";
import { FactorMessageTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/factor/message/factor-message.component";
import { FactorMessageValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/factor/message/factor-message.component";
import { FactorDynamicComponent } from "src/assets/examples/reactive-form-validators/decorators/factor/dynamic/factor-dynamic.component";
import { FactorDynamicValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/factor/dynamic/factor-dynamic.component";
import { FactorAddComponent } from "src/assets/examples/reactive-form-validators/decorators/factor/add/factor-add.component";
import { FactorAddTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/factor/add/factor-add.component";
import { FactorAddValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/factor/add/factor-add.component";
import { FactorEditComponent } from "src/assets/examples/reactive-form-validators/decorators/factor/edit/factor-edit.component";

export const FACTOR_COMPONENT_EXAMPLE_CONSTANT: { [key: string]: any } = {
	decorators:{
						complete : FactorCompleteComponent,
						fieldName : FactorFieldNameComponent,
						conditionalExpression : FactorConditionalExpressionComponent,
						dividend : FactorDividendComponent,
						message : FactorMessageComponent,
						dynamic : FactorDynamicComponent,
						add : FactorAddComponent,
						edit : FactorEditComponent,
			  },
	validators:{
						complete : FactorCompleteValidatorComponent,
						fieldName : FactorFieldNameValidatorComponent,
						conditionalExpression : FactorConditionalExpressionValidatorComponent,
						dividend : FactorDividendValidatorComponent,
						message : FactorMessageValidatorComponent,
						dynamic : FactorDynamicValidatorComponent,
						add : FactorAddValidatorComponent,
			  },
	template_driven:{
						complete : FactorCompleteTemplateDrivenComponent,
						fieldName : FactorFieldNameTemplateDrivenComponent,
						conditionalExpression : FactorConditionalExpressionTemplateDrivenComponent,
						dividend : FactorDividendTemplateDrivenComponent,
						message : FactorMessageTemplateDrivenComponent,
						add : FactorAddTemplateDrivenComponent,
			  },
}