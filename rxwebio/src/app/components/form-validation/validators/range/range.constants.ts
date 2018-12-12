import { RangeCompleteComponent } from "src/assets/examples/reactive-form-validators/decorators/range/complete/range-complete.component";
import { RangeCompleteTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/range/complete/range-complete.component";
import { RangeCompleteTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/range/complete/range-complete.component";
import { RangeCompleteValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/range/complete/range-complete.component";
import { RangeMinimumNumberComponent } from "src/assets/examples/reactive-form-validators/decorators/range/minimumNumber/range-minimum-number.component";
import { RangeMinimumNumberTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/range/minimumNumber/range-minimum-number.component";
import { RangeMinimumNumberTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/range/minimumNumber/range-minimum-number.component";
import { RangeMinimumNumberValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/range/minimumNumber/range-minimum-number.component";
import { RangeMaximumNumberComponent } from "src/assets/examples/reactive-form-validators/decorators/range/maximumNumber/range-maximum-number.component";
import { RangeMaximumNumberTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/range/maximumNumber/range-maximum-number.component";
import { RangeMaximumNumberTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/range/maximumNumber/range-maximum-number.component";
import { RangeMaximumNumberValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/range/maximumNumber/range-maximum-number.component";
import { RangeConditionalExpressionComponent } from "src/assets/examples/reactive-form-validators/decorators/range/conditionalExpression/range-conditional-expression.component";
import { RangeConditionalExpressionTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/range/conditionalExpression/range-conditional-expression.component";
import { RangeConditionalExpressionTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/range/conditionalExpression/range-conditional-expression.component";
import { RangeConditionalExpressionValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/range/conditionalExpression/range-conditional-expression.component";
import { RangeMessageComponent } from "src/assets/examples/reactive-form-validators/decorators/range/message/range-message.component";
import { RangeMessageTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/range/message/range-message.component";
import { RangeMessageTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/range/message/range-message.component";
import { RangeMessageValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/range/message/range-message.component";
import { RangeDynamicComponent } from "src/assets/examples/reactive-form-validators/decorators/range/dynamic/range-dynamic.component";
import { RangeDynamicValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/range/dynamic/range-dynamic.component";
import { RangeAddComponent } from "src/assets/examples/reactive-form-validators/decorators/range/add/range-add.component";
import { RangeAddTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/range/add/range-add.component";
import { RangeAddTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/range/add/range-add.component";
import { RangeAddValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/range/add/range-add.component";
import { RangeEditComponent } from "src/assets/examples/reactive-form-validators/decorators/range/edit/range-edit.component";

export const RANGE_COMPONENT_EXAMPLE_CONSTANT: { [key: string]: any } = {
	decorators:{
						complete : RangeCompleteComponent,
						minimumNumber : RangeMinimumNumberComponent,
						maximumNumber : RangeMaximumNumberComponent,
						conditionalExpression : RangeConditionalExpressionComponent,
						message : RangeMessageComponent,
						dynamic : RangeDynamicComponent,
						add : RangeAddComponent,
						edit : RangeEditComponent,
			  },
	validators:{
						complete : RangeCompleteValidatorComponent,
						minimumNumber : RangeMinimumNumberValidatorComponent,
						maximumNumber : RangeMaximumNumberValidatorComponent,
						conditionalExpression : RangeConditionalExpressionValidatorComponent,
						message : RangeMessageValidatorComponent,
						dynamic : RangeDynamicValidatorComponent,
						add : RangeAddValidatorComponent,
			  },
	template_driven_validation_directives:{
						complete : RangeCompleteTemplateDrivenValidationDirectivesComponent,
						minimumNumber : RangeMinimumNumberTemplateDrivenValidationDirectivesComponent,
						maximumNumber : RangeMaximumNumberTemplateDrivenValidationDirectivesComponent,
						conditionalExpression : RangeConditionalExpressionTemplateDrivenValidationDirectivesComponent,
						message : RangeMessageTemplateDrivenValidationDirectivesComponent,
						add : RangeAddTemplateDrivenValidationDirectivesComponent,
			  },
	template_driven_validation_decorators:{
						complete : RangeCompleteTemplateDrivenValidationDecoratorsComponent,
						minimumNumber : RangeMinimumNumberTemplateDrivenValidationDecoratorsComponent,
						maximumNumber : RangeMaximumNumberTemplateDrivenValidationDecoratorsComponent,
						conditionalExpression : RangeConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
						message : RangeMessageTemplateDrivenValidationDecoratorsComponent,
						add : RangeAddTemplateDrivenValidationDecoratorsComponent,
			  },
}