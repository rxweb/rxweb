import { MinDateCompleteComponent } from "src/assets/examples/reactive-form-validators/decorators/minDate/complete/min-date-complete.component";
import { MinDateCompleteTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/minDate/complete/min-date-complete.component";
import { MinDateCompleteValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/minDate/complete/min-date-complete.component";
import { MinDateValueComponent } from "src/assets/examples/reactive-form-validators/decorators/minDate/value/min-date-value.component";
import { MinDateValueTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/minDate/value/min-date-value.component";
import { MinDateValueValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/minDate/value/min-date-value.component";
import { MinDateConditionalExpressionComponent } from "src/assets/examples/reactive-form-validators/decorators/minDate/conditionalExpression/min-date-conditional-expression.component";
import { MinDateConditionalExpressionTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/minDate/conditionalExpression/min-date-conditional-expression.component";
import { MinDateConditionalExpressionValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/minDate/conditionalExpression/min-date-conditional-expression.component";
import { MinDateMessageComponent } from "src/assets/examples/reactive-form-validators/decorators/minDate/message/min-date-message.component";
import { MinDateMessageTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/minDate/message/min-date-message.component";
import { MinDateMessageValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/minDate/message/min-date-message.component";
import { MinDateFieldNameComponent } from "src/assets/examples/reactive-form-validators/decorators/minDate/fieldName/min-date-field-name.component";
import { MinDateFieldNameTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/minDate/fieldName/min-date-field-name.component";
import { MinDateFieldNameValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/minDate/fieldName/min-date-field-name.component";
import { MinDateDynamicComponent } from "src/assets/examples/reactive-form-validators/decorators/minDate/dynamic/min-date-dynamic.component";
import { MinDateDynamicValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/minDate/dynamic/min-date-dynamic.component";
import { MinDateAddComponent } from "src/assets/examples/reactive-form-validators/decorators/minDate/add/min-date-add.component";
import { MinDateAddTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/minDate/add/min-date-add.component";
import { MinDateAddValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/minDate/add/min-date-add.component";
import { MinDateEditComponent } from "src/assets/examples/reactive-form-validators/decorators/minDate/edit/min-date-edit.component";

export const MIN_DATE_COMPONENT_EXAMPLE_CONSTANT: { [key: string]: any } = {
	decorators:{
						complete : MinDateCompleteComponent,
						value : MinDateValueComponent,
						conditionalExpression : MinDateConditionalExpressionComponent,
						message : MinDateMessageComponent,
						fieldName : MinDateFieldNameComponent,
						dynamic : MinDateDynamicComponent,
						add : MinDateAddComponent,
						edit : MinDateEditComponent,
			  },
	validators:{
						complete : MinDateCompleteValidatorComponent,
						value : MinDateValueValidatorComponent,
						conditionalExpression : MinDateConditionalExpressionValidatorComponent,
						message : MinDateMessageValidatorComponent,
						fieldName : MinDateFieldNameValidatorComponent,
						dynamic : MinDateDynamicValidatorComponent,
						add : MinDateAddValidatorComponent,
			  },
	template_driven:{
						complete : MinDateCompleteTemplateDrivenComponent,
						value : MinDateValueTemplateDrivenComponent,
						conditionalExpression : MinDateConditionalExpressionTemplateDrivenComponent,
						message : MinDateMessageTemplateDrivenComponent,
						fieldName : MinDateFieldNameTemplateDrivenComponent,
						add : MinDateAddTemplateDrivenComponent,
			  },
}