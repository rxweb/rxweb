import { RangeCompleteComponent } from "src/assets/examples/reactive-form-validators/decorators/range/complete/range-complete.component";
import { RangeCompleteTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/range/complete/range-complete.component";
import { RangeCompleteValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/range/complete/range-complete.component";
import { RangeMinimumNumberComponent } from "src/assets/examples/reactive-form-validators/decorators/range/minimumNumber/range-minimum-number.component";
import { RangeMinimumNumberTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/range/minimumNumber/range-minimum-number.component";
import { RangeMinimumNumberValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/range/minimumNumber/range-minimum-number.component";
import { RangeMaximumNumberComponent } from "src/assets/examples/reactive-form-validators/decorators/range/maximumNumber/range-maximum-number.component";
import { RangeMaximumNumberTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/range/maximumNumber/range-maximum-number.component";
import { RangeMaximumNumberValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/range/maximumNumber/range-maximum-number.component";
import { RangeConditionalExpressionComponent } from "src/assets/examples/reactive-form-validators/decorators/range/conditionalExpression/range-conditional-expression.component";
import { RangeConditionalExpressionTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/range/conditionalExpression/range-conditional-expression.component";
import { RangeConditionalExpressionValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/range/conditionalExpression/range-conditional-expression.component";
import { RangeMessageComponent } from "src/assets/examples/reactive-form-validators/decorators/range/message/range-message.component";
import { RangeMessageTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/range/message/range-message.component";
import { RangeMessageValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/range/message/range-message.component";
import { RangeDynamicComponent } from "src/assets/examples/reactive-form-validators/decorators/range/dynamic/range-dynamic.component";
import { RangeDynamicValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/range/dynamic/range-dynamic.component";
import { RangeAddComponent } from "src/assets/examples/reactive-form-validators/decorators/range/add/range-add.component";
import { RangeAddTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/range/add/range-add.component";
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
	template_driven:{
						complete : RangeCompleteTemplateDrivenComponent,
						minimumNumber : RangeMinimumNumberTemplateDrivenComponent,
						maximumNumber : RangeMaximumNumberTemplateDrivenComponent,
						conditionalExpression : RangeConditionalExpressionTemplateDrivenComponent,
						message : RangeMessageTemplateDrivenComponent,
						add : RangeAddTemplateDrivenComponent,
			  },
}