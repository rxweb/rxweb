import { ContainsCompleteComponent } from "src/assets/examples/reactive-form-validators/decorators/contains/complete/contains-complete.component";
import { ContainsCompleteTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/contains/complete/contains-complete.component";
import { ContainsCompleteValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/contains/complete/contains-complete.component";
import { ContainsValueComponent } from "src/assets/examples/reactive-form-validators/decorators/contains/value/contains-value.component";
import { ContainsValueTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/contains/value/contains-value.component";
import { ContainsValueValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/contains/value/contains-value.component";
import { ContainsConditionalExpressionComponent } from "src/assets/examples/reactive-form-validators/decorators/contains/conditionalExpression/contains-conditional-expression.component";
import { ContainsConditionalExpressionTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/contains/conditionalExpression/contains-conditional-expression.component";
import { ContainsConditionalExpressionValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/contains/conditionalExpression/contains-conditional-expression.component";
import { ContainsMessageComponent } from "src/assets/examples/reactive-form-validators/decorators/contains/message/contains-message.component";
import { ContainsMessageTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/contains/message/contains-message.component";
import { ContainsMessageValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/contains/message/contains-message.component";
import { ContainsDynamicComponent } from "src/assets/examples/reactive-form-validators/decorators/contains/dynamic/contains-dynamic.component";
import { ContainsDynamicValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/contains/dynamic/contains-dynamic.component";
import { ContainsAddComponent } from "src/assets/examples/reactive-form-validators/decorators/contains/add/contains-add.component";
import { ContainsAddTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/contains/add/contains-add.component";
import { ContainsAddValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/contains/add/contains-add.component";
import { ContainsEditComponent } from "src/assets/examples/reactive-form-validators/decorators/contains/edit/contains-edit.component";

export const CONTAINS_COMPONENT_EXAMPLE_CONSTANT: { [key: string]: any } = {
	decorators:{
						complete : ContainsCompleteComponent,
						value : ContainsValueComponent,
						conditionalExpression : ContainsConditionalExpressionComponent,
						message : ContainsMessageComponent,
						dynamic : ContainsDynamicComponent,
						add : ContainsAddComponent,
						edit : ContainsEditComponent,
			  },
	validators:{
						complete : ContainsCompleteValidatorComponent,
						value : ContainsValueValidatorComponent,
						conditionalExpression : ContainsConditionalExpressionValidatorComponent,
						message : ContainsMessageValidatorComponent,
						dynamic : ContainsDynamicValidatorComponent,
						add : ContainsAddValidatorComponent,
			  },
	template_driven:{
						complete : ContainsCompleteTemplateDrivenComponent,
						value : ContainsValueTemplateDrivenComponent,
						conditionalExpression : ContainsConditionalExpressionTemplateDrivenComponent,
						message : ContainsMessageTemplateDrivenComponent,
						add : ContainsAddTemplateDrivenComponent,
			  },
}