import { LessThanEqualToCompleteComponent } from "src/assets/examples/reactive-form-validators/decorators/lessThanEqualTo/complete/less-than-equal-to-complete.component";
import { LessThanEqualToCompleteTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/lessThanEqualTo/complete/less-than-equal-to-complete.component";
import { LessThanEqualToCompleteValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/lessThanEqualTo/complete/less-than-equal-to-complete.component";
import { LessThanEqualToFieldNameComponent } from "src/assets/examples/reactive-form-validators/decorators/lessThanEqualTo/fieldName/less-than-equal-to-field-name.component";
import { LessThanEqualToFieldNameTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/lessThanEqualTo/fieldName/less-than-equal-to-field-name.component";
import { LessThanEqualToFieldNameValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/lessThanEqualTo/fieldName/less-than-equal-to-field-name.component";
import { LessThanEqualToConditionalExpressionComponent } from "src/assets/examples/reactive-form-validators/decorators/lessThanEqualTo/conditionalExpression/less-than-equal-to-conditional-expression.component";
import { LessThanEqualToConditionalExpressionTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/lessThanEqualTo/conditionalExpression/less-than-equal-to-conditional-expression.component";
import { LessThanEqualToConditionalExpressionValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/lessThanEqualTo/conditionalExpression/less-than-equal-to-conditional-expression.component";
import { LessThanEqualToMessageComponent } from "src/assets/examples/reactive-form-validators/decorators/lessThanEqualTo/message/less-than-equal-to-message.component";
import { LessThanEqualToMessageTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/lessThanEqualTo/message/less-than-equal-to-message.component";
import { LessThanEqualToMessageValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/lessThanEqualTo/message/less-than-equal-to-message.component";
import { LessThanEqualToDynamicComponent } from "src/assets/examples/reactive-form-validators/decorators/lessThanEqualTo/dynamic/less-than-equal-to-dynamic.component";
import { LessThanEqualToDynamicValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/lessThanEqualTo/dynamic/less-than-equal-to-dynamic.component";
import { LessThanEqualToAddComponent } from "src/assets/examples/reactive-form-validators/decorators/lessThanEqualTo/add/less-than-equal-to-add.component";
import { LessThanEqualToAddTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/lessThanEqualTo/add/less-than-equal-to-add.component";
import { LessThanEqualToAddValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/lessThanEqualTo/add/less-than-equal-to-add.component";
import { LessThanEqualToEditComponent } from "src/assets/examples/reactive-form-validators/decorators/lessThanEqualTo/edit/less-than-equal-to-edit.component";

export const LESS_THAN_EQUAL_TO_COMPONENT_EXAMPLE_CONSTANT: { [key: string]: any } = {
	decorators:{
						complete : LessThanEqualToCompleteComponent,
						fieldName : LessThanEqualToFieldNameComponent,
						conditionalExpression : LessThanEqualToConditionalExpressionComponent,
						message : LessThanEqualToMessageComponent,
						dynamic : LessThanEqualToDynamicComponent,
						add : LessThanEqualToAddComponent,
						edit : LessThanEqualToEditComponent,
			  },
	validators:{
						complete : LessThanEqualToCompleteValidatorComponent,
						fieldName : LessThanEqualToFieldNameValidatorComponent,
						conditionalExpression : LessThanEqualToConditionalExpressionValidatorComponent,
						message : LessThanEqualToMessageValidatorComponent,
						dynamic : LessThanEqualToDynamicValidatorComponent,
						add : LessThanEqualToAddValidatorComponent,
			  },
	template_driven:{
						complete : LessThanEqualToCompleteTemplateDrivenComponent,
						fieldName : LessThanEqualToFieldNameTemplateDrivenComponent,
						conditionalExpression : LessThanEqualToConditionalExpressionTemplateDrivenComponent,
						message : LessThanEqualToMessageTemplateDrivenComponent,
						add : LessThanEqualToAddTemplateDrivenComponent,
			  },
}