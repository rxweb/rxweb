import { PrimeNumberCompleteComponent } from "src/assets/examples/reactive-form-validators/decorators/primeNumber/complete/prime-number-complete.component";
import { PrimeNumberCompleteTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/primeNumber/complete/prime-number-complete.component";
import { PrimeNumberCompleteTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/primeNumber/complete/prime-number-complete.component";
import { PrimeNumberCompleteValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/primeNumber/complete/prime-number-complete.component";
import { PrimeNumberConditionalExpressionComponent } from "src/assets/examples/reactive-form-validators/decorators/primeNumber/conditionalExpression/prime-number-conditional-expression.component";
import { PrimeNumberConditionalExpressionTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/primeNumber/conditionalExpression/prime-number-conditional-expression.component";
import { PrimeNumberConditionalExpressionTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/primeNumber/conditionalExpression/prime-number-conditional-expression.component";
import { PrimeNumberConditionalExpressionValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/primeNumber/conditionalExpression/prime-number-conditional-expression.component";
import { PrimeNumberMessageComponent } from "src/assets/examples/reactive-form-validators/decorators/primeNumber/message/prime-number-message.component";
import { PrimeNumberMessageTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/primeNumber/message/prime-number-message.component";
import { PrimeNumberMessageTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/primeNumber/message/prime-number-message.component";
import { PrimeNumberMessageValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/primeNumber/message/prime-number-message.component";
import { PrimeNumberDynamicComponent } from "src/assets/examples/reactive-form-validators/decorators/primeNumber/dynamic/prime-number-dynamic.component";
import { PrimeNumberDynamicValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/primeNumber/dynamic/prime-number-dynamic.component";
import { PrimeNumberAddComponent } from "src/assets/examples/reactive-form-validators/decorators/primeNumber/add/prime-number-add.component";
import { PrimeNumberAddTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/primeNumber/add/prime-number-add.component";
import { PrimeNumberAddTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/primeNumber/add/prime-number-add.component";
import { PrimeNumberAddValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/primeNumber/add/prime-number-add.component";
import { PrimeNumberEditComponent } from "src/assets/examples/reactive-form-validators/decorators/primeNumber/edit/prime-number-edit.component";

export const PRIME_NUMBER_COMPONENT_EXAMPLE_CONSTANT: { [key: string]: any } = {
	decorators:{
						complete : PrimeNumberCompleteComponent,
						conditionalExpression : PrimeNumberConditionalExpressionComponent,
						message : PrimeNumberMessageComponent,
						dynamic : PrimeNumberDynamicComponent,
						add : PrimeNumberAddComponent,
						edit : PrimeNumberEditComponent,
			  },
	validators:{
						complete : PrimeNumberCompleteValidatorComponent,
						conditionalExpression : PrimeNumberConditionalExpressionValidatorComponent,
						message : PrimeNumberMessageValidatorComponent,
						dynamic : PrimeNumberDynamicValidatorComponent,
						add : PrimeNumberAddValidatorComponent,
			  },
	template_driven_validation_directives:{
						complete : PrimeNumberCompleteTemplateDrivenValidationDirectivesComponent,
						conditionalExpression : PrimeNumberConditionalExpressionTemplateDrivenValidationDirectivesComponent,
						message : PrimeNumberMessageTemplateDrivenValidationDirectivesComponent,
						add : PrimeNumberAddTemplateDrivenValidationDirectivesComponent,
			  },
	template_driven_validation_decorators:{
						complete : PrimeNumberCompleteTemplateDrivenValidationDecoratorsComponent,
						conditionalExpression : PrimeNumberConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
						message : PrimeNumberMessageTemplateDrivenValidationDecoratorsComponent,
						add : PrimeNumberAddTemplateDrivenValidationDecoratorsComponent,
			  },
}