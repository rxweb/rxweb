import { LatLongCompleteComponent } from "src/assets/examples/reactive-form-validators/decorators/latLong/complete/lat-long-complete.component";
import { LatLongCompleteTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/latLong/complete/lat-long-complete.component";
import { LatLongCompleteTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/latLong/complete/lat-long-complete.component";
import { LatLongCompleteValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/latLong/complete/lat-long-complete.component";
import { LatLongConditionalExpressionComponent } from "src/assets/examples/reactive-form-validators/decorators/latLong/conditionalExpression/lat-long-conditional-expression.component";
import { LatLongConditionalExpressionTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/latLong/conditionalExpression/lat-long-conditional-expression.component";
import { LatLongConditionalExpressionTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/latLong/conditionalExpression/lat-long-conditional-expression.component";
import { LatLongConditionalExpressionValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/latLong/conditionalExpression/lat-long-conditional-expression.component";
import { LatLongMessageComponent } from "src/assets/examples/reactive-form-validators/decorators/latLong/message/lat-long-message.component";
import { LatLongMessageTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/latLong/message/lat-long-message.component";
import { LatLongMessageTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/latLong/message/lat-long-message.component";
import { LatLongMessageValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/latLong/message/lat-long-message.component";
import { LatLongDynamicComponent } from "src/assets/examples/reactive-form-validators/decorators/latLong/dynamic/lat-long-dynamic.component";
import { LatLongDynamicValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/latLong/dynamic/lat-long-dynamic.component";
import { LatLongAddComponent } from "src/assets/examples/reactive-form-validators/decorators/latLong/add/lat-long-add.component";
import { LatLongAddTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/latLong/add/lat-long-add.component";
import { LatLongAddTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/latLong/add/lat-long-add.component";
import { LatLongAddValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/latLong/add/lat-long-add.component";
import { LatLongEditComponent } from "src/assets/examples/reactive-form-validators/decorators/latLong/edit/lat-long-edit.component";

export const LAT_LONG_COMPONENT_EXAMPLE_CONSTANT: { [key: string]: any } = {
	decorators:{
						complete : LatLongCompleteComponent,
						conditionalExpression : LatLongConditionalExpressionComponent,
						message : LatLongMessageComponent,
						dynamic : LatLongDynamicComponent,
						add : LatLongAddComponent,
						edit : LatLongEditComponent,
			  },
	template_driven_validation_directives:{
						complete : LatLongCompleteTemplateDrivenValidationDirectivesComponent,
						conditionalExpression : LatLongConditionalExpressionTemplateDrivenValidationDirectivesComponent,
						message : LatLongMessageTemplateDrivenValidationDirectivesComponent,
						add : LatLongAddTemplateDrivenValidationDirectivesComponent,
			  },
	template_driven_validation_decorators:{
						complete : LatLongCompleteTemplateDrivenValidationDecoratorsComponent,
						conditionalExpression : LatLongConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
						message : LatLongMessageTemplateDrivenValidationDecoratorsComponent,
						add : LatLongAddTemplateDrivenValidationDecoratorsComponent,
			  },
	validators:{
						complete : LatLongCompleteValidatorComponent,
						conditionalExpression : LatLongConditionalExpressionValidatorComponent,
						message : LatLongMessageValidatorComponent,
						dynamic : LatLongDynamicValidatorComponent,
						add : LatLongAddValidatorComponent,
			  },
}