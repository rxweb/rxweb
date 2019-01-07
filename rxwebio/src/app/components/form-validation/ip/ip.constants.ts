import { IpCompleteValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/ip/complete/ip-complete.component";
import { IpVersionValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/ip/version/ip-version.component";
import { IpIsCidrValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/ip/isCidr/ip-is-cidr.component";
import { IpConditionalExpressionValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/ip/conditionalExpression/ip-conditional-expression.component";
import { IpMessageValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/ip/message/ip-message.component";
import { IpDynamicValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/ip/dynamic/ip-dynamic.component";
import { IpAddValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/ip/add/ip-add.component";

export const IP_COMPONENT_EXAMPLE_CONSTANT: { [key: string]: any } = {
	validators:{
						complete : IpCompleteValidatorComponent,
						version : IpVersionValidatorComponent,
						isCidr : IpIsCidrValidatorComponent,
						conditionalExpression : IpConditionalExpressionValidatorComponent,
						message : IpMessageValidatorComponent,
						dynamic : IpDynamicValidatorComponent,
						add : IpAddValidatorComponent,
			  },
}