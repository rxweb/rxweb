import { CreditCardCompleteComponent } from "src/assets/examples/reactive-form-validators/decorators/creditCard/complete/credit-card-complete.component";
import { CreditCardCompleteTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/creditCard/complete/credit-card-complete.component";
import { CreditCardCompleteTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/creditCard/complete/credit-card-complete.component";
import { CreditCardCompleteValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/creditCard/complete/credit-card-complete.component";
import { CreditCardFieldNameComponent } from "src/assets/examples/reactive-form-validators/decorators/creditCard/fieldName/credit-card-field-name.component";
import { CreditCardFieldNameTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/creditCard/fieldName/credit-card-field-name.component";
import { CreditCardFieldNameTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/creditCard/fieldName/credit-card-field-name.component";
import { CreditCardFieldNameValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/creditCard/fieldName/credit-card-field-name.component";
import { CreditCardConditionalExpressionComponent } from "src/assets/examples/reactive-form-validators/decorators/creditCard/conditionalExpression/credit-card-conditional-expression.component";
import { CreditCardConditionalExpressionTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/creditCard/conditionalExpression/credit-card-conditional-expression.component";
import { CreditCardConditionalExpressionTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/creditCard/conditionalExpression/credit-card-conditional-expression.component";
import { CreditCardConditionalExpressionValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/creditCard/conditionalExpression/credit-card-conditional-expression.component";
import { CreditCardMessageComponent } from "src/assets/examples/reactive-form-validators/decorators/creditCard/message/credit-card-message.component";
import { CreditCardMessageTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/creditCard/message/credit-card-message.component";
import { CreditCardMessageTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/creditCard/message/credit-card-message.component";
import { CreditCardMessageValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/creditCard/message/credit-card-message.component";
import { CreditCardDynamicComponent } from "src/assets/examples/reactive-form-validators/decorators/creditCard/dynamic/credit-card-dynamic.component";
import { CreditCardDynamicValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/creditCard/dynamic/credit-card-dynamic.component";
import { CreditCardAddComponent } from "src/assets/examples/reactive-form-validators/decorators/creditCard/add/credit-card-add.component";
import { CreditCardAddTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/creditCard/add/credit-card-add.component";
import { CreditCardAddTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/creditCard/add/credit-card-add.component";
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
	template_driven_validation_directives:{
						complete : CreditCardCompleteTemplateDrivenValidationDirectivesComponent,
						fieldName : CreditCardFieldNameTemplateDrivenValidationDirectivesComponent,
						conditionalExpression : CreditCardConditionalExpressionTemplateDrivenValidationDirectivesComponent,
						message : CreditCardMessageTemplateDrivenValidationDirectivesComponent,
						add : CreditCardAddTemplateDrivenValidationDirectivesComponent,
			  },
	template_driven_validation_decorators:{
						complete : CreditCardCompleteTemplateDrivenValidationDecoratorsComponent,
						fieldName : CreditCardFieldNameTemplateDrivenValidationDecoratorsComponent,
						conditionalExpression : CreditCardConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
						message : CreditCardMessageTemplateDrivenValidationDecoratorsComponent,
						add : CreditCardAddTemplateDrivenValidationDecoratorsComponent,
			  },
}