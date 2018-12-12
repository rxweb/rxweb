import { TimeCompleteComponent } from "src/assets/examples/reactive-form-validators/decorators/time/complete/time-complete.component";
import { TimeCompleteTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/time/complete/time-complete.component";
import { TimeCompleteTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/time/complete/time-complete.component";
import { TimeCompleteValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/time/complete/time-complete.component";
import { TimeConditionalExpressionComponent } from "src/assets/examples/reactive-form-validators/decorators/time/conditionalExpression/time-conditional-expression.component";
import { TimeConditionalExpressionTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/time/conditionalExpression/time-conditional-expression.component";
import { TimeConditionalExpressionTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/time/conditionalExpression/time-conditional-expression.component";
import { TimeConditionalExpressionValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/time/conditionalExpression/time-conditional-expression.component";
import { TimeAllowSecondsComponent } from "src/assets/examples/reactive-form-validators/decorators/time/allowSeconds/time-allow-seconds.component";
import { TimeAllowSecondsTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/time/allowSeconds/time-allow-seconds.component";
import { TimeAllowSecondsTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/time/allowSeconds/time-allow-seconds.component";
import { TimeAllowSecondsValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/time/allowSeconds/time-allow-seconds.component";
import { TimeMessageComponent } from "src/assets/examples/reactive-form-validators/decorators/time/message/time-message.component";
import { TimeMessageTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/time/message/time-message.component";
import { TimeMessageTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/time/message/time-message.component";
import { TimeMessageValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/time/message/time-message.component";
import { TimeDynamicComponent } from "src/assets/examples/reactive-form-validators/decorators/time/dynamic/time-dynamic.component";
import { TimeDynamicValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/time/dynamic/time-dynamic.component";
import { TimeAddComponent } from "src/assets/examples/reactive-form-validators/decorators/time/add/time-add.component";
import { TimeAddTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/time/add/time-add.component";
import { TimeAddTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/time/add/time-add.component";
import { TimeAddValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/time/add/time-add.component";
import { TimeEditComponent } from "src/assets/examples/reactive-form-validators/decorators/time/edit/time-edit.component";

export const TIME_COMPONENT_EXAMPLE_CONSTANT: { [key: string]: any } = {
	decorators:{
						complete : TimeCompleteComponent,
						conditionalExpression : TimeConditionalExpressionComponent,
						allowSeconds : TimeAllowSecondsComponent,
						message : TimeMessageComponent,
						dynamic : TimeDynamicComponent,
						add : TimeAddComponent,
						edit : TimeEditComponent,
			  },
	validators:{
						complete : TimeCompleteValidatorComponent,
						conditionalExpression : TimeConditionalExpressionValidatorComponent,
						allowSeconds : TimeAllowSecondsValidatorComponent,
						message : TimeMessageValidatorComponent,
						dynamic : TimeDynamicValidatorComponent,
						add : TimeAddValidatorComponent,
			  },
	template_driven_validation_directives:{
						complete : TimeCompleteTemplateDrivenValidationDirectivesComponent,
						conditionalExpression : TimeConditionalExpressionTemplateDrivenValidationDirectivesComponent,
						allowSeconds : TimeAllowSecondsTemplateDrivenValidationDirectivesComponent,
						message : TimeMessageTemplateDrivenValidationDirectivesComponent,
						add : TimeAddTemplateDrivenValidationDirectivesComponent,
			  },
	template_driven_validation_decorators:{
						complete : TimeCompleteTemplateDrivenValidationDecoratorsComponent,
						conditionalExpression : TimeConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
						allowSeconds : TimeAllowSecondsTemplateDrivenValidationDecoratorsComponent,
						message : TimeMessageTemplateDrivenValidationDecoratorsComponent,
						add : TimeAddTemplateDrivenValidationDecoratorsComponent,
			  },
}