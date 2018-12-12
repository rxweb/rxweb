import { LongitudeCompleteComponent } from "src/assets/examples/reactive-form-validators/decorators/longitude/complete/longitude-complete.component";
import { LongitudeCompleteTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/longitude/complete/longitude-complete.component";
import { LongitudeCompleteTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/longitude/complete/longitude-complete.component";
import { LongitudeCompleteValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/longitude/complete/longitude-complete.component";
import { LongitudeConditionalExpressionComponent } from "src/assets/examples/reactive-form-validators/decorators/longitude/conditionalExpression/longitude-conditional-expression.component";
import { LongitudeConditionalExpressionTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/longitude/conditionalExpression/longitude-conditional-expression.component";
import { LongitudeConditionalExpressionTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/longitude/conditionalExpression/longitude-conditional-expression.component";
import { LongitudeConditionalExpressionValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/longitude/conditionalExpression/longitude-conditional-expression.component";
import { LongitudeMessageComponent } from "src/assets/examples/reactive-form-validators/decorators/longitude/message/longitude-message.component";
import { LongitudeMessageTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/longitude/message/longitude-message.component";
import { LongitudeMessageTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/longitude/message/longitude-message.component";
import { LongitudeMessageValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/longitude/message/longitude-message.component";
import { LongitudeDynamicComponent } from "src/assets/examples/reactive-form-validators/decorators/longitude/dynamic/longitude-dynamic.component";
import { LongitudeDynamicValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/longitude/dynamic/longitude-dynamic.component";
import { LongitudeAddComponent } from "src/assets/examples/reactive-form-validators/decorators/longitude/add/longitude-add.component";
import { LongitudeAddTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/longitude/add/longitude-add.component";
import { LongitudeAddTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/longitude/add/longitude-add.component";
import { LongitudeAddValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/longitude/add/longitude-add.component";
import { LongitudeEditComponent } from "src/assets/examples/reactive-form-validators/decorators/longitude/edit/longitude-edit.component";

export const LONGITUDE_COMPONENT_EXAMPLE_CONSTANT: { [key: string]: any } = {
	decorators:{
						complete : LongitudeCompleteComponent,
						conditionalExpression : LongitudeConditionalExpressionComponent,
						message : LongitudeMessageComponent,
						dynamic : LongitudeDynamicComponent,
						add : LongitudeAddComponent,
						edit : LongitudeEditComponent,
			  },
	validators:{
						complete : LongitudeCompleteValidatorComponent,
						conditionalExpression : LongitudeConditionalExpressionValidatorComponent,
						message : LongitudeMessageValidatorComponent,
						dynamic : LongitudeDynamicValidatorComponent,
						add : LongitudeAddValidatorComponent,
			  },
	template_driven_validation_directives:{
						complete : LongitudeCompleteTemplateDrivenValidationDirectivesComponent,
						conditionalExpression : LongitudeConditionalExpressionTemplateDrivenValidationDirectivesComponent,
						message : LongitudeMessageTemplateDrivenValidationDirectivesComponent,
						add : LongitudeAddTemplateDrivenValidationDirectivesComponent,
			  },
	template_driven_validation_decorators:{
						complete : LongitudeCompleteTemplateDrivenValidationDecoratorsComponent,
						conditionalExpression : LongitudeConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
						message : LongitudeMessageTemplateDrivenValidationDecoratorsComponent,
						add : LongitudeAddTemplateDrivenValidationDecoratorsComponent,
			  },
}