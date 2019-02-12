import { MaxDateCompleteComponent } from "src/assets/examples/reactive-form-validators/decorators/maxDate/complete/max-date-complete.component";
import { MaxDateCompleteTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/maxDate/complete/max-date-complete.component";
import { MaxDateCompleteTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/maxDate/complete/max-date-complete.component";
import { MaxDateCompleteValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/maxDate/complete/max-date-complete.component";
import { MaxDateValueComponent } from "src/assets/examples/reactive-form-validators/decorators/maxDate/value/max-date-value.component";
import { MaxDateValueTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/maxDate/value/max-date-value.component";
import { MaxDateValueTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/maxDate/value/max-date-value.component";
import { MaxDateValueValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/maxDate/value/max-date-value.component";
import { MaxDateConditionalExpressionComponent } from "src/assets/examples/reactive-form-validators/decorators/maxDate/conditionalExpression/max-date-conditional-expression.component";
import { MaxDateConditionalExpressionTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/maxDate/conditionalExpression/max-date-conditional-expression.component";
import { MaxDateConditionalExpressionTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/maxDate/conditionalExpression/max-date-conditional-expression.component";
import { MaxDateConditionalExpressionValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/maxDate/conditionalExpression/max-date-conditional-expression.component";
import { MaxDateMessageComponent } from "src/assets/examples/reactive-form-validators/decorators/maxDate/message/max-date-message.component";
import { MaxDateMessageTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/maxDate/message/max-date-message.component";
import { MaxDateMessageTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/maxDate/message/max-date-message.component";
import { MaxDateMessageValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/maxDate/message/max-date-message.component";
import { MaxDateFieldNameComponent } from "src/assets/examples/reactive-form-validators/decorators/maxDate/fieldName/max-date-field-name.component";
import { MaxDateFieldNameTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/maxDate/fieldName/max-date-field-name.component";
import { MaxDateFieldNameTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/maxDate/fieldName/max-date-field-name.component";
import { MaxDateFieldNameValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/maxDate/fieldName/max-date-field-name.component";
import { MaxDateOperatorComponent } from "src/assets/examples/reactive-form-validators/decorators/maxDate/operator/max-date-operator.component";
import { MaxDateOperatorTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/maxDate/operator/max-date-operator.component";
import { MaxDateOperatorTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/maxDate/operator/max-date-operator.component";
import { MaxDateOperatorValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/maxDate/operator/max-date-operator.component";
import { MaxDateDynamicComponent } from "src/assets/examples/reactive-form-validators/decorators/maxDate/dynamic/max-date-dynamic.component";
import { MaxDateDynamicValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/maxDate/dynamic/max-date-dynamic.component";
import { MaxDateAddComponent } from "src/assets/examples/reactive-form-validators/decorators/maxDate/add/max-date-add.component";
import { MaxDateAddTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/maxDate/add/max-date-add.component";
import { MaxDateAddTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/maxDate/add/max-date-add.component";
import { MaxDateAddValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/maxDate/add/max-date-add.component";
import { MaxDateEditComponent } from "src/assets/examples/reactive-form-validators/decorators/maxDate/edit/max-date-edit.component";

export const MAX_DATE_COMPONENT_EXAMPLE_CONSTANT: { [key: string]: any } = {
	decorators:{
						complete : MaxDateCompleteComponent,
						value : MaxDateValueComponent,
						conditionalExpression : MaxDateConditionalExpressionComponent,
						message : MaxDateMessageComponent,
						fieldName : MaxDateFieldNameComponent,
						operator : MaxDateOperatorComponent,
						dynamic : MaxDateDynamicComponent,
						add : MaxDateAddComponent,
						edit : MaxDateEditComponent,
			  },
	template_driven_validation_directives:{
						complete : MaxDateCompleteTemplateDrivenValidationDirectivesComponent,
						value : MaxDateValueTemplateDrivenValidationDirectivesComponent,
						conditionalExpression : MaxDateConditionalExpressionTemplateDrivenValidationDirectivesComponent,
						message : MaxDateMessageTemplateDrivenValidationDirectivesComponent,
						fieldName : MaxDateFieldNameTemplateDrivenValidationDirectivesComponent,
						operator : MaxDateOperatorTemplateDrivenValidationDirectivesComponent,
						add : MaxDateAddTemplateDrivenValidationDirectivesComponent,
			  },
	template_driven_validation_decorators:{
						complete : MaxDateCompleteTemplateDrivenValidationDecoratorsComponent,
						value : MaxDateValueTemplateDrivenValidationDecoratorsComponent,
						conditionalExpression : MaxDateConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
						message : MaxDateMessageTemplateDrivenValidationDecoratorsComponent,
						fieldName : MaxDateFieldNameTemplateDrivenValidationDecoratorsComponent,
						operator : MaxDateOperatorTemplateDrivenValidationDecoratorsComponent,
						add : MaxDateAddTemplateDrivenValidationDecoratorsComponent,
			  },
	validators:{
						complete : MaxDateCompleteValidatorComponent,
						value : MaxDateValueValidatorComponent,
						conditionalExpression : MaxDateConditionalExpressionValidatorComponent,
						message : MaxDateMessageValidatorComponent,
						fieldName : MaxDateFieldNameValidatorComponent,
						operator : MaxDateOperatorValidatorComponent,
						dynamic : MaxDateDynamicValidatorComponent,
						add : MaxDateAddValidatorComponent,
			  },
}