import { LatitudeCompleteComponent } from "src/assets/examples/reactive-form-validators/decorators/latitude/complete/latitude-complete.component";
import { LatitudeCompleteTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/latitude/complete/latitude-complete.component";
import { LatitudeCompleteValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/latitude/complete/latitude-complete.component";
import { LatitudeConditionalExpressionComponent } from "src/assets/examples/reactive-form-validators/decorators/latitude/conditionalExpression/latitude-conditional-expression.component";
import { LatitudeConditionalExpressionTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/latitude/conditionalExpression/latitude-conditional-expression.component";
import { LatitudeConditionalExpressionValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/latitude/conditionalExpression/latitude-conditional-expression.component";
import { LatitudeMessageComponent } from "src/assets/examples/reactive-form-validators/decorators/latitude/message/latitude-message.component";
import { LatitudeMessageTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/latitude/message/latitude-message.component";
import { LatitudeMessageValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/latitude/message/latitude-message.component";
import { LatitudeDynamicComponent } from "src/assets/examples/reactive-form-validators/decorators/latitude/dynamic/latitude-dynamic.component";
import { LatitudeDynamicValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/latitude/dynamic/latitude-dynamic.component";
import { LatitudeAddComponent } from "src/assets/examples/reactive-form-validators/decorators/latitude/add/latitude-add.component";
import { LatitudeAddTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/latitude/add/latitude-add.component";
import { LatitudeAddValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/latitude/add/latitude-add.component";
import { LatitudeEditComponent } from "src/assets/examples/reactive-form-validators/decorators/latitude/edit/latitude-edit.component";

export const LATITUDE_COMPONENT_EXAMPLE_CONSTANT: { [key: string]: any } = {
	decorators:{
						complete : LatitudeCompleteComponent,
						conditionalExpression : LatitudeConditionalExpressionComponent,
						message : LatitudeMessageComponent,
						dynamic : LatitudeDynamicComponent,
						add : LatitudeAddComponent,
						edit : LatitudeEditComponent,
			  },
	validators:{
						complete : LatitudeCompleteValidatorComponent,
						conditionalExpression : LatitudeConditionalExpressionValidatorComponent,
						message : LatitudeMessageValidatorComponent,
						dynamic : LatitudeDynamicValidatorComponent,
						add : LatitudeAddValidatorComponent,
			  },
	template_driven:{
						complete : LatitudeCompleteTemplateDrivenComponent,
						conditionalExpression : LatitudeConditionalExpressionTemplateDrivenComponent,
						message : LatitudeMessageTemplateDrivenComponent,
						add : LatitudeAddTemplateDrivenComponent,
			  },
}