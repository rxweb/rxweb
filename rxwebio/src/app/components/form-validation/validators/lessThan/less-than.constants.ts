import { LessThanCompleteComponent } from "src/assets/examples/reactive-form-validators/decorators/lessThan/complete/less-than-complete.component";
import { LessThanCompleteTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/lessThan/complete/less-than-complete.component";
import { LessThanCompleteValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/lessThan/complete/less-than-complete.component";
import { LessThanFieldNameComponent } from "src/assets/examples/reactive-form-validators/decorators/lessThan/fieldName/less-than-field-name.component";
import { LessThanFieldNameTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/lessThan/fieldName/less-than-field-name.component";
import { LessThanFieldNameValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/lessThan/fieldName/less-than-field-name.component";
import { LessThanConditionalExpressionComponent } from "src/assets/examples/reactive-form-validators/decorators/lessThan/conditionalExpression/less-than-conditional-expression.component";
import { LessThanConditionalExpressionTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/lessThan/conditionalExpression/less-than-conditional-expression.component";
import { LessThanConditionalExpressionValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/lessThan/conditionalExpression/less-than-conditional-expression.component";
import { LessThanMessageComponent } from "src/assets/examples/reactive-form-validators/decorators/lessThan/message/less-than-message.component";
import { LessThanMessageTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/lessThan/message/less-than-message.component";
import { LessThanMessageValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/lessThan/message/less-than-message.component";
import { LessThanDynamicComponent } from "src/assets/examples/reactive-form-validators/decorators/lessThan/dynamic/less-than-dynamic.component";
import { LessThanDynamicValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/lessThan/dynamic/less-than-dynamic.component";
import { LessThanAddComponent } from "src/assets/examples/reactive-form-validators/decorators/lessThan/add/less-than-add.component";
import { LessThanAddTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/lessThan/add/less-than-add.component";
import { LessThanAddValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/lessThan/add/less-than-add.component";
import { LessThanEditComponent } from "src/assets/examples/reactive-form-validators/decorators/lessThan/edit/less-than-edit.component";

export const LESS_THAN_COMPONENT_EXAMPLE_CONSTANT: { [key: string]: any } = {
	decorators:{
						complete : LessThanCompleteComponent,
						fieldName : LessThanFieldNameComponent,
						conditionalExpression : LessThanConditionalExpressionComponent,
						message : LessThanMessageComponent,
						dynamic : LessThanDynamicComponent,
						add : LessThanAddComponent,
						edit : LessThanEditComponent,
			  },
	validators:{
						complete : LessThanCompleteValidatorComponent,
						fieldName : LessThanFieldNameValidatorComponent,
						conditionalExpression : LessThanConditionalExpressionValidatorComponent,
						message : LessThanMessageValidatorComponent,
						dynamic : LessThanDynamicValidatorComponent,
						add : LessThanAddValidatorComponent,
			  },
	template_driven:{
						complete : LessThanCompleteTemplateDrivenComponent,
						fieldName : LessThanFieldNameTemplateDrivenComponent,
						conditionalExpression : LessThanConditionalExpressionTemplateDrivenComponent,
						message : LessThanMessageTemplateDrivenComponent,
						add : LessThanAddTemplateDrivenComponent,
			  },
}