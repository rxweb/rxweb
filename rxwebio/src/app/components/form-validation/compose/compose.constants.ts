import { ComposeCompleteValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/compose/complete/compose-complete.component";
import { ComposeValidatorsValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/compose/validators/compose-validators.component";
import { ComposeMessageKeyValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/compose/messageKey/compose-message-key.component";
import { ComposeConditionalExpressionValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/compose/conditionalExpression/compose-conditional-expression.component";
import { ComposeMessageValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/compose/message/compose-message.component";
import { ComposeDynamicValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/compose/dynamic/compose-dynamic.component";
import { ComposeAddValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/compose/add/compose-add.component";

export const COMPOSE_COMPONENT_EXAMPLE_CONSTANT: { [key: string]: any } = {
	validators:{
						complete : ComposeCompleteValidatorComponent,
						validators : ComposeValidatorsValidatorComponent,
						messageKey : ComposeMessageKeyValidatorComponent,
						conditionalExpression : ComposeConditionalExpressionValidatorComponent,
						message : ComposeMessageValidatorComponent,
						dynamic : ComposeDynamicValidatorComponent,
						add : ComposeAddValidatorComponent,
			  },
}