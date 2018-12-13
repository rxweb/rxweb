import { LeapYearCompleteComponent } from "src/assets/examples/reactive-form-validators/decorators/leapYear/complete/leap-year-complete.component";
import { LeapYearCompleteTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/leapYear/complete/leap-year-complete.component";
import { LeapYearCompleteTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/leapYear/complete/leap-year-complete.component";
import { LeapYearCompleteValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/leapYear/complete/leap-year-complete.component";
import { LeapYearConditionalExpressionComponent } from "src/assets/examples/reactive-form-validators/decorators/leapYear/conditionalExpression/leap-year-conditional-expression.component";
import { LeapYearConditionalExpressionTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/leapYear/conditionalExpression/leap-year-conditional-expression.component";
import { LeapYearConditionalExpressionTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/leapYear/conditionalExpression/leap-year-conditional-expression.component";
import { LeapYearConditionalExpressionValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/leapYear/conditionalExpression/leap-year-conditional-expression.component";
import { LeapYearMessageComponent } from "src/assets/examples/reactive-form-validators/decorators/leapYear/message/leap-year-message.component";
import { LeapYearMessageTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/leapYear/message/leap-year-message.component";
import { LeapYearMessageTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/leapYear/message/leap-year-message.component";
import { LeapYearMessageValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/leapYear/message/leap-year-message.component";
import { LeapYearDynamicComponent } from "src/assets/examples/reactive-form-validators/decorators/leapYear/dynamic/leap-year-dynamic.component";
import { LeapYearDynamicValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/leapYear/dynamic/leap-year-dynamic.component";
import { LeapYearAddComponent } from "src/assets/examples/reactive-form-validators/decorators/leapYear/add/leap-year-add.component";
import { LeapYearAddTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/leapYear/add/leap-year-add.component";
import { LeapYearAddTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/leapYear/add/leap-year-add.component";
import { LeapYearAddValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/leapYear/add/leap-year-add.component";
import { LeapYearEditComponent } from "src/assets/examples/reactive-form-validators/decorators/leapYear/edit/leap-year-edit.component";

export const LEAP_YEAR_COMPONENT_EXAMPLE_CONSTANT: { [key: string]: any } = {
	decorators:{
						complete : LeapYearCompleteComponent,
						conditionalExpression : LeapYearConditionalExpressionComponent,
						message : LeapYearMessageComponent,
						dynamic : LeapYearDynamicComponent,
						add : LeapYearAddComponent,
						edit : LeapYearEditComponent,
			  },
	validators:{
						complete : LeapYearCompleteValidatorComponent,
						conditionalExpression : LeapYearConditionalExpressionValidatorComponent,
						message : LeapYearMessageValidatorComponent,
						dynamic : LeapYearDynamicValidatorComponent,
						add : LeapYearAddValidatorComponent,
			  },
	template_driven_validation_directives:{
						complete : LeapYearCompleteTemplateDrivenValidationDirectivesComponent,
						conditionalExpression : LeapYearConditionalExpressionTemplateDrivenValidationDirectivesComponent,
						message : LeapYearMessageTemplateDrivenValidationDirectivesComponent,
						add : LeapYearAddTemplateDrivenValidationDirectivesComponent,
			  },
	template_driven_validation_decorators:{
						complete : LeapYearCompleteTemplateDrivenValidationDecoratorsComponent,
						conditionalExpression : LeapYearConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
						message : LeapYearMessageTemplateDrivenValidationDecoratorsComponent,
						add : LeapYearAddTemplateDrivenValidationDecoratorsComponent,
			  },
}