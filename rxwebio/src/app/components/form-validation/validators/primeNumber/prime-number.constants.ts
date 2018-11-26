import { PrimeNumberCompleteComponent } from "src/assets/examples/reactive-form-validators/decorators/primeNumber/complete/prime-number-complete.component";
import { PrimeNumberCompleteTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/primeNumber/complete/prime-number-complete.component";
import { PrimeNumberCompleteValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/primeNumber/complete/prime-number-complete.component";
import { PrimeNumberConditionalExpressionComponent } from "src/assets/examples/reactive-form-validators/decorators/primeNumber/conditionalExpression/prime-number-conditional-expression.component";
import { PrimeNumberConditionalExpressionTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/primeNumber/conditionalExpression/prime-number-conditional-expression.component";
import { PrimeNumberConditionalExpressionValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/primeNumber/conditionalExpression/prime-number-conditional-expression.component";
import { PrimeNumberMessageComponent } from "src/assets/examples/reactive-form-validators/decorators/primeNumber/message/prime-number-message.component";
import { PrimeNumberMessageTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/primeNumber/message/prime-number-message.component";
import { PrimeNumberMessageValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/primeNumber/message/prime-number-message.component";
import { PrimeNumberDynamicComponent } from "src/assets/examples/reactive-form-validators/decorators/primeNumber/dynamic/prime-number-dynamic.component";
import { PrimeNumberDynamicValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/primeNumber/dynamic/prime-number-dynamic.component";
import { PrimeNumberAddComponent } from "src/assets/examples/reactive-form-validators/decorators/primeNumber/add/prime-number-add.component";
import { PrimeNumberAddTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/primeNumber/add/prime-number-add.component";
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
	template_driven:{
						complete : PrimeNumberCompleteTemplateDrivenComponent,
						conditionalExpression : PrimeNumberConditionalExpressionTemplateDrivenComponent,
						message : PrimeNumberMessageTemplateDrivenComponent,
						add : PrimeNumberAddTemplateDrivenComponent,
			  },
}