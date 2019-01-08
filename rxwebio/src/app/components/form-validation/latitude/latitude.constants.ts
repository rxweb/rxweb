import { LatitudeCompleteComponent } from "src/assets/examples/reactive-form-validators/decorators/latitude/complete/latitude-complete.component";
import { LatitudeCompleteTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/latitude/complete/latitude-complete.component";
import { LatitudeCompleteTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/latitude/complete/latitude-complete.component";
import { LatitudeCompleteValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/latitude/complete/latitude-complete.component";
import { LatitudeConditionalExpressionComponent } from "src/assets/examples/reactive-form-validators/decorators/latitude/conditionalExpression/latitude-conditional-expression.component";
import { LatitudeConditionalExpressionTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/latitude/conditionalExpression/latitude-conditional-expression.component";
import { LatitudeConditionalExpressionTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/latitude/conditionalExpression/latitude-conditional-expression.component";
import { LatitudeConditionalExpressionValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/latitude/conditionalExpression/latitude-conditional-expression.component";
import { LatitudeMessageComponent } from "src/assets/examples/reactive-form-validators/decorators/latitude/message/latitude-message.component";
import { LatitudeMessageTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/latitude/message/latitude-message.component";
import { LatitudeMessageTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/latitude/message/latitude-message.component";
import { LatitudeMessageValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/latitude/message/latitude-message.component";
import { LatitudeDynamicComponent } from "src/assets/examples/reactive-form-validators/decorators/latitude/dynamic/latitude-dynamic.component";
import { LatitudeDynamicValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/latitude/dynamic/latitude-dynamic.component";
import { LatitudeAddComponent } from "src/assets/examples/reactive-form-validators/decorators/latitude/add/latitude-add.component";
import { LatitudeAddTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/latitude/add/latitude-add.component";
import { LatitudeAddTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/latitude/add/latitude-add.component";
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
	template_driven_validation_directives:{
						complete : LatitudeCompleteTemplateDrivenValidationDirectivesComponent,
						conditionalExpression : LatitudeConditionalExpressionTemplateDrivenValidationDirectivesComponent,
						message : LatitudeMessageTemplateDrivenValidationDirectivesComponent,
						add : LatitudeAddTemplateDrivenValidationDirectivesComponent,
			  },
	template_driven_validation_decorators:{
						complete : LatitudeCompleteTemplateDrivenValidationDecoratorsComponent,
						conditionalExpression : LatitudeConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
						message : LatitudeMessageTemplateDrivenValidationDecoratorsComponent,
						add : LatitudeAddTemplateDrivenValidationDecoratorsComponent,
			  },
	validators:{
						complete : LatitudeCompleteValidatorComponent,
						conditionalExpression : LatitudeConditionalExpressionValidatorComponent,
						message : LatitudeMessageValidatorComponent,
						dynamic : LatitudeDynamicValidatorComponent,
						add : LatitudeAddValidatorComponent,
			  },
}