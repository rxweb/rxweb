import { DataUriCompleteComponent } from "src/assets/examples/reactive-form-validators/decorators/dataUri/complete/data-uri-complete.component";
import { DataUriCompleteTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/dataUri/complete/data-uri-complete.component";
import { DataUriCompleteValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/dataUri/complete/data-uri-complete.component";
import { DataUriConditionalExpressionComponent } from "src/assets/examples/reactive-form-validators/decorators/dataUri/conditionalExpression/data-uri-conditional-expression.component";
import { DataUriConditionalExpressionTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/dataUri/conditionalExpression/data-uri-conditional-expression.component";
import { DataUriConditionalExpressionValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/dataUri/conditionalExpression/data-uri-conditional-expression.component";
import { DataUriMessageComponent } from "src/assets/examples/reactive-form-validators/decorators/dataUri/message/data-uri-message.component";
import { DataUriMessageTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/dataUri/message/data-uri-message.component";
import { DataUriMessageValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/dataUri/message/data-uri-message.component";
import { DataUriDynamicComponent } from "src/assets/examples/reactive-form-validators/decorators/dataUri/dynamic/data-uri-dynamic.component";
import { DataUriDynamicValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/dataUri/dynamic/data-uri-dynamic.component";
import { DataUriAddComponent } from "src/assets/examples/reactive-form-validators/decorators/dataUri/add/data-uri-add.component";
import { DataUriAddTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/dataUri/add/data-uri-add.component";
import { DataUriAddValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/dataUri/add/data-uri-add.component";
import { DataUriEditComponent } from "src/assets/examples/reactive-form-validators/decorators/dataUri/edit/data-uri-edit.component";

export const DATA_URI_COMPONENT_EXAMPLE_CONSTANT: { [key: string]: any } = {
	decorators:{
						complete : DataUriCompleteComponent,
						conditionalExpression : DataUriConditionalExpressionComponent,
						message : DataUriMessageComponent,
						dynamic : DataUriDynamicComponent,
						add : DataUriAddComponent,
						edit : DataUriEditComponent,
			  },
	validators:{
						complete : DataUriCompleteValidatorComponent,
						conditionalExpression : DataUriConditionalExpressionValidatorComponent,
						message : DataUriMessageValidatorComponent,
						dynamic : DataUriDynamicValidatorComponent,
						add : DataUriAddValidatorComponent,
			  },
	template_driven:{
						complete : DataUriCompleteTemplateDrivenComponent,
						conditionalExpression : DataUriConditionalExpressionTemplateDrivenComponent,
						message : DataUriMessageTemplateDrivenComponent,
						add : DataUriAddTemplateDrivenComponent,
			  },
}