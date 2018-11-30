import { CreditCardCompleteComponent } from "src/assets/examples/reactive-form-validators/decorators/creditCard/complete/credit-card-complete.component";
import { CreditCardCompleteTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/creditCard/complete/credit-card-complete.component";
import { CreditCardCompleteValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/creditCard/complete/credit-card-complete.component";
import { CreditCardFieldNameComponent } from "src/assets/examples/reactive-form-validators/decorators/creditCard/fieldName/credit-card-field-name.component";
import { CreditCardFieldNameTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/creditCard/fieldName/credit-card-field-name.component";
import { CreditCardFieldNameValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/creditCard/fieldName/credit-card-field-name.component";
import { CreditCardConditionalExpressionComponent } from "src/assets/examples/reactive-form-validators/decorators/creditCard/conditionalExpression/credit-card-conditional-expression.component";
import { CreditCardConditionalExpressionTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/creditCard/conditionalExpression/credit-card-conditional-expression.component";
import { CreditCardConditionalExpressionValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/creditCard/conditionalExpression/credit-card-conditional-expression.component";
import { CreditCardMessageComponent } from "src/assets/examples/reactive-form-validators/decorators/creditCard/message/credit-card-message.component";
import { CreditCardMessageTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/creditCard/message/credit-card-message.component";
import { CreditCardMessageValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/creditCard/message/credit-card-message.component";
import { CreditCardDynamicComponent } from "src/assets/examples/reactive-form-validators/decorators/creditCard/dynamic/credit-card-dynamic.component";
import { CreditCardDynamicValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/creditCard/dynamic/credit-card-dynamic.component";
import { CreditCardAddComponent } from "src/assets/examples/reactive-form-validators/decorators/creditCard/add/credit-card-add.component";
import { CreditCardAddTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/creditCard/add/credit-card-add.component";
import { CreditCardAddValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/creditCard/add/credit-card-add.component";
import { CreditCardEditComponent } from "src/assets/examples/reactive-form-validators/decorators/creditCard/edit/credit-card-edit.component";

export const CREDIT_CARD_COMPONENT_EXAMPLE_CONSTANT: { [key: string]: any } = {
	decorators:{
						complete : CreditCardCompleteComponent,
						fieldName : CreditCardFieldNameComponent,
						conditionalExpression : CreditCardConditionalExpressionComponent,
						message : CreditCardMessageComponent,
						dynamic : CreditCardDynamicComponent,
						add : CreditCardAddComponent,
						edit : CreditCardEditComponent,
			  },
	validators:{
						complete : CreditCardCompleteValidatorComponent,
						fieldName : CreditCardFieldNameValidatorComponent,
						conditionalExpression : CreditCardConditionalExpressionValidatorComponent,
						message : CreditCardMessageValidatorComponent,
						dynamic : CreditCardDynamicValidatorComponent,
						add : CreditCardAddValidatorComponent,
			  },
	template_driven:{
						complete : CreditCardCompleteTemplateDrivenComponent,
						fieldName : CreditCardFieldNameTemplateDrivenComponent,
						conditionalExpression : CreditCardConditionalExpressionTemplateDrivenComponent,
						message : CreditCardMessageTemplateDrivenComponent,
						add : CreditCardAddTemplateDrivenComponent,
			  },
}