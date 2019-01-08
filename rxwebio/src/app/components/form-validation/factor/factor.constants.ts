import { FactorCompleteComponent } from "src/assets/examples/reactive-form-validators/decorators/factor/complete/factor-complete.component";
import { FactorCompleteTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/factor/complete/factor-complete.component";
import { FactorCompleteTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/factor/complete/factor-complete.component";
import { FactorCompleteValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/factor/complete/factor-complete.component";
import { FactorFieldNameComponent } from "src/assets/examples/reactive-form-validators/decorators/factor/fieldName/factor-field-name.component";
import { FactorFieldNameTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/factor/fieldName/factor-field-name.component";
import { FactorFieldNameTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/factor/fieldName/factor-field-name.component";
import { FactorFieldNameValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/factor/fieldName/factor-field-name.component";
import { FactorConditionalExpressionComponent } from "src/assets/examples/reactive-form-validators/decorators/factor/conditionalExpression/factor-conditional-expression.component";
import { FactorConditionalExpressionTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/factor/conditionalExpression/factor-conditional-expression.component";
import { FactorConditionalExpressionTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/factor/conditionalExpression/factor-conditional-expression.component";
import { FactorConditionalExpressionValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/factor/conditionalExpression/factor-conditional-expression.component";
import { FactorDividendComponent } from "src/assets/examples/reactive-form-validators/decorators/factor/dividend/factor-dividend.component";
import { FactorDividendTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/factor/dividend/factor-dividend.component";
import { FactorDividendTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/factor/dividend/factor-dividend.component";
import { FactorDividendValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/factor/dividend/factor-dividend.component";
import { FactorMessageComponent } from "src/assets/examples/reactive-form-validators/decorators/factor/message/factor-message.component";
import { FactorMessageTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/factor/message/factor-message.component";
import { FactorMessageTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/factor/message/factor-message.component";
import { FactorMessageValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/factor/message/factor-message.component";
import { FactorDynamicComponent } from "src/assets/examples/reactive-form-validators/decorators/factor/dynamic/factor-dynamic.component";
import { FactorDynamicValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/factor/dynamic/factor-dynamic.component";
import { FactorAddComponent } from "src/assets/examples/reactive-form-validators/decorators/factor/add/factor-add.component";
import { FactorAddTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/factor/add/factor-add.component";
import { FactorAddTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/factor/add/factor-add.component";
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
	template_driven_validation_directives:{
						complete : FactorCompleteTemplateDrivenValidationDirectivesComponent,
						fieldName : FactorFieldNameTemplateDrivenValidationDirectivesComponent,
						conditionalExpression : FactorConditionalExpressionTemplateDrivenValidationDirectivesComponent,
						dividend : FactorDividendTemplateDrivenValidationDirectivesComponent,
						message : FactorMessageTemplateDrivenValidationDirectivesComponent,
						add : FactorAddTemplateDrivenValidationDirectivesComponent,
			  },
	template_driven_validation_decorators:{
						complete : FactorCompleteTemplateDrivenValidationDecoratorsComponent,
						fieldName : FactorFieldNameTemplateDrivenValidationDecoratorsComponent,
						conditionalExpression : FactorConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
						dividend : FactorDividendTemplateDrivenValidationDecoratorsComponent,
						message : FactorMessageTemplateDrivenValidationDecoratorsComponent,
						add : FactorAddTemplateDrivenValidationDecoratorsComponent,
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
}