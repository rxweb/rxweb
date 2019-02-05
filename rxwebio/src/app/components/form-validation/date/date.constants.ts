import { DateCompleteComponent } from "src/assets/examples/reactive-form-validators/decorators/date/complete/date-complete.component";
import { DateCompleteTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/date/complete/date-complete.component";
import { DateCompleteTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/date/complete/date-complete.component";
import { DateCompleteValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/date/complete/date-complete.component";
import { DateConditionalExpressionComponent } from "src/assets/examples/reactive-form-validators/decorators/date/conditionalExpression/date-conditional-expression.component";
import { DateConditionalExpressionTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/date/conditionalExpression/date-conditional-expression.component";
import { DateConditionalExpressionTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/date/conditionalExpression/date-conditional-expression.component";
import { DateConditionalExpressionValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/date/conditionalExpression/date-conditional-expression.component";
import { DateMessageComponent } from "src/assets/examples/reactive-form-validators/decorators/date/message/date-message.component";
import { DateMessageTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/date/message/date-message.component";
import { DateMessageTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/date/message/date-message.component";
import { DateMessageValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/date/message/date-message.component";
import { DateDynamicComponent } from "src/assets/examples/reactive-form-validators/decorators/date/dynamic/date-dynamic.component";
import { DateDynamicValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/date/dynamic/date-dynamic.component";
import { DateAddComponent } from "src/assets/examples/reactive-form-validators/decorators/date/add/date-add.component";
import { DateAddTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/date/add/date-add.component";
import { DateAddTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/date/add/date-add.component";
import { DateAddValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/date/add/date-add.component";
import { DateEditComponent } from "src/assets/examples/reactive-form-validators/decorators/date/edit/date-edit.component";

export const DATE_COMPONENT_EXAMPLE_CONSTANT: { [key: string]: any } = {
	decorators:{
						complete : DateCompleteComponent,
						conditionalExpression : DateConditionalExpressionComponent,
						message : DateMessageComponent,
						dynamic : DateDynamicComponent,
						add : DateAddComponent,
						edit : DateEditComponent,
			  },
	template_driven_validation_directives:{
						complete : DateCompleteTemplateDrivenValidationDirectivesComponent,
						conditionalExpression : DateConditionalExpressionTemplateDrivenValidationDirectivesComponent,
						message : DateMessageTemplateDrivenValidationDirectivesComponent,
						add : DateAddTemplateDrivenValidationDirectivesComponent,
			  },
	template_driven_validation_decorators:{
						complete : DateCompleteTemplateDrivenValidationDecoratorsComponent,
						conditionalExpression : DateConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
						message : DateMessageTemplateDrivenValidationDecoratorsComponent,
						add : DateAddTemplateDrivenValidationDecoratorsComponent,
			  },
	validators:{
						complete : DateCompleteValidatorComponent,
						conditionalExpression : DateConditionalExpressionValidatorComponent,
						message : DateMessageValidatorComponent,
						dynamic : DateDynamicValidatorComponent,
						add : DateAddValidatorComponent,
			  },
}