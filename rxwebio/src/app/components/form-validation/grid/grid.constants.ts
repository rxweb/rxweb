import { GridCompleteComponent } from "src/assets/examples/reactive-form-validators/decorators/grid/complete/grid-complete.component";
import { GridCompleteTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/grid/complete/grid-complete.component";
import { GridCompleteTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/grid/complete/grid-complete.component";
import { GridCompleteValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/grid/complete/grid-complete.component";
import { GridConditionalExpressionComponent } from "src/assets/examples/reactive-form-validators/decorators/grid/conditionalExpression/grid-conditional-expression.component";
import { GridConditionalExpressionTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/grid/conditionalExpression/grid-conditional-expression.component";
import { GridConditionalExpressionTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/grid/conditionalExpression/grid-conditional-expression.component";
import { GridConditionalExpressionValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/grid/conditionalExpression/grid-conditional-expression.component";
import { GridMessageComponent } from "src/assets/examples/reactive-form-validators/decorators/grid/message/grid-message.component";
import { GridMessageTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/grid/message/grid-message.component";
import { GridMessageTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/grid/message/grid-message.component";
import { GridMessageValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/grid/message/grid-message.component";
import { GridDynamicComponent } from "src/assets/examples/reactive-form-validators/decorators/grid/dynamic/grid-dynamic.component";
import { GridDynamicValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/grid/dynamic/grid-dynamic.component";
import { GridAddComponent } from "src/assets/examples/reactive-form-validators/decorators/grid/add/grid-add.component";
import { GridAddTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/grid/add/grid-add.component";
import { GridAddTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/grid/add/grid-add.component";
import { GridAddValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/grid/add/grid-add.component";
import { GridEditComponent } from "src/assets/examples/reactive-form-validators/decorators/grid/edit/grid-edit.component";

export const GRID_COMPONENT_EXAMPLE_CONSTANT: { [key: string]: any } = {
	decorators:{
						complete : GridCompleteComponent,
						conditionalExpression : GridConditionalExpressionComponent,
						message : GridMessageComponent,
						dynamic : GridDynamicComponent,
						add : GridAddComponent,
						edit : GridEditComponent,
			  },
	template_driven_validation_directives:{
						complete : GridCompleteTemplateDrivenValidationDirectivesComponent,
						conditionalExpression : GridConditionalExpressionTemplateDrivenValidationDirectivesComponent,
						message : GridMessageTemplateDrivenValidationDirectivesComponent,
						add : GridAddTemplateDrivenValidationDirectivesComponent,
			  },
	template_driven_validation_decorators:{
						complete : GridCompleteTemplateDrivenValidationDecoratorsComponent,
						conditionalExpression : GridConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
						message : GridMessageTemplateDrivenValidationDecoratorsComponent,
						add : GridAddTemplateDrivenValidationDecoratorsComponent,
			  },
	validators:{
						complete : GridCompleteValidatorComponent,
						conditionalExpression : GridConditionalExpressionValidatorComponent,
						message : GridMessageValidatorComponent,
						dynamic : GridDynamicValidatorComponent,
						add : GridAddValidatorComponent,
			  },
}