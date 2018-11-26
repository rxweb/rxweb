import { EmailCompleteComponent } from "src/assets/examples/reactive-form-validators/decorators/email/complete/email-complete.component";
import { EmailCompleteTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/email/complete/email-complete.component";
import { EmailCompleteValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/email/complete/email-complete.component";
import { EmailConditionalExpressionComponent } from "src/assets/examples/reactive-form-validators/decorators/email/conditionalExpression/email-conditional-expression.component";
import { EmailConditionalExpressionTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/email/conditionalExpression/email-conditional-expression.component";
import { EmailConditionalExpressionValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/email/conditionalExpression/email-conditional-expression.component";
import { EmailMessageComponent } from "src/assets/examples/reactive-form-validators/decorators/email/message/email-message.component";
import { EmailMessageTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/email/message/email-message.component";
import { EmailMessageValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/email/message/email-message.component";
import { EmailDynamicComponent } from "src/assets/examples/reactive-form-validators/decorators/email/dynamic/email-dynamic.component";
import { EmailDynamicValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/email/dynamic/email-dynamic.component";
import { EmailAddComponent } from "src/assets/examples/reactive-form-validators/decorators/email/add/email-add.component";
import { EmailAddTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/email/add/email-add.component";
import { EmailAddValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/email/add/email-add.component";
import { EmailEditComponent } from "src/assets/examples/reactive-form-validators/decorators/email/edit/email-edit.component";

export const EMAIL_COMPONENT_EXAMPLE_CONSTANT: { [key: string]: any } = {
	decorators:{
						complete : EmailCompleteComponent,
						conditionalExpression : EmailConditionalExpressionComponent,
						message : EmailMessageComponent,
						dynamic : EmailDynamicComponent,
						add : EmailAddComponent,
						edit : EmailEditComponent,
			  },
	validators:{
						complete : EmailCompleteValidatorComponent,
						conditionalExpression : EmailConditionalExpressionValidatorComponent,
						message : EmailMessageValidatorComponent,
						dynamic : EmailDynamicValidatorComponent,
						add : EmailAddValidatorComponent,
			  },
	template_driven:{
						complete : EmailCompleteTemplateDrivenComponent,
						conditionalExpression : EmailConditionalExpressionTemplateDrivenComponent,
						message : EmailMessageTemplateDrivenComponent,
						add : EmailAddTemplateDrivenComponent,
			  },
}