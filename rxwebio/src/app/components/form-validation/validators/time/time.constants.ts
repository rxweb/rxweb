import { TimeCompleteComponent } from "src/assets/examples/reactive-form-validators/decorators/time/complete/time-complete.component";
import { TimeCompleteTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/time/complete/time-complete.component";
import { TimeCompleteValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/time/complete/time-complete.component";
import { TimeConditionalExpressionComponent } from "src/assets/examples/reactive-form-validators/decorators/time/conditionalExpression/time-conditional-expression.component";
import { TimeConditionalExpressionTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/time/conditionalExpression/time-conditional-expression.component";
import { TimeConditionalExpressionValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/time/conditionalExpression/time-conditional-expression.component";
import { TimeAllowSecondsComponent } from "src/assets/examples/reactive-form-validators/decorators/time/allowSeconds/time-allow-seconds.component";
import { TimeAllowSecondsTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/time/allowSeconds/time-allow-seconds.component";
import { TimeAllowSecondsValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/time/allowSeconds/time-allow-seconds.component";
import { TimeMessageComponent } from "src/assets/examples/reactive-form-validators/decorators/time/message/time-message.component";
import { TimeMessageTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/time/message/time-message.component";
import { TimeMessageValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/time/message/time-message.component";
import { TimeDynamicComponent } from "src/assets/examples/reactive-form-validators/decorators/time/dynamic/time-dynamic.component";
import { TimeDynamicValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/time/dynamic/time-dynamic.component";
import { TimeAddComponent } from "src/assets/examples/reactive-form-validators/decorators/time/add/time-add.component";
import { TimeAddTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/time/add/time-add.component";
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
	template_driven:{
						complete : TimeCompleteTemplateDrivenComponent,
						conditionalExpression : TimeConditionalExpressionTemplateDrivenComponent,
						allowSeconds : TimeAllowSecondsTemplateDrivenComponent,
						message : TimeMessageTemplateDrivenComponent,
						add : TimeAddTemplateDrivenComponent,
			  },
}