import { MaxDateCompleteComponent } from "src/assets/examples/reactive-form-validators/decorators/maxDate/complete/max-date-complete.component";
import { MaxDateCompleteTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/maxDate/complete/max-date-complete.component";
import { MaxDateCompleteValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/maxDate/complete/max-date-complete.component";
import { MaxDateValueComponent } from "src/assets/examples/reactive-form-validators/decorators/maxDate/value/max-date-value.component";
import { MaxDateValueTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/maxDate/value/max-date-value.component";
import { MaxDateValueValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/maxDate/value/max-date-value.component";
import { MaxDateConditionalExpressionComponent } from "src/assets/examples/reactive-form-validators/decorators/maxDate/conditionalExpression/max-date-conditional-expression.component";
import { MaxDateConditionalExpressionTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/maxDate/conditionalExpression/max-date-conditional-expression.component";
import { MaxDateConditionalExpressionValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/maxDate/conditionalExpression/max-date-conditional-expression.component";
import { MaxDateMessageComponent } from "src/assets/examples/reactive-form-validators/decorators/maxDate/message/max-date-message.component";
import { MaxDateMessageTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/maxDate/message/max-date-message.component";
import { MaxDateMessageValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/maxDate/message/max-date-message.component";
import { MaxDateFieldNameComponent } from "src/assets/examples/reactive-form-validators/decorators/maxDate/fieldName/max-date-field-name.component";
import { MaxDateFieldNameTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/maxDate/fieldName/max-date-field-name.component";
import { MaxDateFieldNameValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/maxDate/fieldName/max-date-field-name.component";
import { MaxDateDynamicComponent } from "src/assets/examples/reactive-form-validators/decorators/maxDate/dynamic/max-date-dynamic.component";
import { MaxDateDynamicValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/maxDate/dynamic/max-date-dynamic.component";
import { MaxDateAddComponent } from "src/assets/examples/reactive-form-validators/decorators/maxDate/add/max-date-add.component";
import { MaxDateAddTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/maxDate/add/max-date-add.component";
import { MaxDateAddValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/maxDate/add/max-date-add.component";
import { MaxDateEditComponent } from "src/assets/examples/reactive-form-validators/decorators/maxDate/edit/max-date-edit.component";

export const MAX_DATE_COMPONENT_EXAMPLE_CONSTANT: { [key: string]: any } = {
	decorators:{
						complete : MaxDateCompleteComponent,
						value : MaxDateValueComponent,
						conditionalExpression : MaxDateConditionalExpressionComponent,
						message : MaxDateMessageComponent,
						fieldName : MaxDateFieldNameComponent,
						dynamic : MaxDateDynamicComponent,
						add : MaxDateAddComponent,
						edit : MaxDateEditComponent,
			  },
	validators:{
						complete : MaxDateCompleteValidatorComponent,
						value : MaxDateValueValidatorComponent,
						conditionalExpression : MaxDateConditionalExpressionValidatorComponent,
						message : MaxDateMessageValidatorComponent,
						fieldName : MaxDateFieldNameValidatorComponent,
						dynamic : MaxDateDynamicValidatorComponent,
						add : MaxDateAddValidatorComponent,
			  },
	template_driven:{
						complete : MaxDateCompleteTemplateDrivenComponent,
						value : MaxDateValueTemplateDrivenComponent,
						conditionalExpression : MaxDateConditionalExpressionTemplateDrivenComponent,
						message : MaxDateMessageTemplateDrivenComponent,
						fieldName : MaxDateFieldNameTemplateDrivenComponent,
						add : MaxDateAddTemplateDrivenComponent,
			  },
}