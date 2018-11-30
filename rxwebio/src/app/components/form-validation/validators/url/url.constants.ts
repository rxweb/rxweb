import { UrlCompleteComponent } from "src/assets/examples/reactive-form-validators/decorators/url/complete/url-complete.component";
import { UrlCompleteTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/url/complete/url-complete.component";
import { UrlCompleteValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/url/complete/url-complete.component";
import { UrlConditionalExpressionComponent } from "src/assets/examples/reactive-form-validators/decorators/url/conditionalExpression/url-conditional-expression.component";
import { UrlConditionalExpressionTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/url/conditionalExpression/url-conditional-expression.component";
import { UrlConditionalExpressionValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/url/conditionalExpression/url-conditional-expression.component";
import { UrlMessageComponent } from "src/assets/examples/reactive-form-validators/decorators/url/message/url-message.component";
import { UrlMessageTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/url/message/url-message.component";
import { UrlMessageValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/url/message/url-message.component";
import { UrlDynamicComponent } from "src/assets/examples/reactive-form-validators/decorators/url/dynamic/url-dynamic.component";
import { UrlDynamicValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/url/dynamic/url-dynamic.component";
import { UrlAddComponent } from "src/assets/examples/reactive-form-validators/decorators/url/add/url-add.component";
import { UrlAddTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/url/add/url-add.component";
import { UrlAddValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/url/add/url-add.component";
import { UrlEditComponent } from "src/assets/examples/reactive-form-validators/decorators/url/edit/url-edit.component";

export const URL_COMPONENT_EXAMPLE_CONSTANT: { [key: string]: any } = {
	decorators:{
						complete : UrlCompleteComponent,
						conditionalExpression : UrlConditionalExpressionComponent,
						message : UrlMessageComponent,
						dynamic : UrlDynamicComponent,
						add : UrlAddComponent,
						edit : UrlEditComponent,
			  },
	validators:{
						complete : UrlCompleteValidatorComponent,
						conditionalExpression : UrlConditionalExpressionValidatorComponent,
						message : UrlMessageValidatorComponent,
						dynamic : UrlDynamicValidatorComponent,
						add : UrlAddValidatorComponent,
			  },
	template_driven:{
						complete : UrlCompleteTemplateDrivenComponent,
						conditionalExpression : UrlConditionalExpressionTemplateDrivenComponent,
						message : UrlMessageTemplateDrivenComponent,
						add : UrlAddTemplateDrivenComponent,
			  },
}