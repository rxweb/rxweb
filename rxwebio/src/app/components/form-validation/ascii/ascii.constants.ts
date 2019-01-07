import { AsciiCompleteComponent } from "src/assets/examples/reactive-form-validators/decorators/ascii/complete/ascii-complete.component";
import { AsciiCompleteTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/ascii/complete/ascii-complete.component";
import { AsciiCompleteTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/ascii/complete/ascii-complete.component";
import { AsciiCompleteValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/ascii/complete/ascii-complete.component";
import { AsciiConditionalExpressionComponent } from "src/assets/examples/reactive-form-validators/decorators/ascii/conditionalExpression/ascii-conditional-expression.component";
import { AsciiConditionalExpressionTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/ascii/conditionalExpression/ascii-conditional-expression.component";
import { AsciiConditionalExpressionTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/ascii/conditionalExpression/ascii-conditional-expression.component";
import { AsciiConditionalExpressionValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/ascii/conditionalExpression/ascii-conditional-expression.component";
import { AsciiMessageComponent } from "src/assets/examples/reactive-form-validators/decorators/ascii/message/ascii-message.component";
import { AsciiMessageTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/ascii/message/ascii-message.component";
import { AsciiMessageTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/ascii/message/ascii-message.component";
import { AsciiMessageValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/ascii/message/ascii-message.component";
import { AsciiDynamicComponent } from "src/assets/examples/reactive-form-validators/decorators/ascii/dynamic/ascii-dynamic.component";
import { AsciiDynamicValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/ascii/dynamic/ascii-dynamic.component";
import { AsciiAddComponent } from "src/assets/examples/reactive-form-validators/decorators/ascii/add/ascii-add.component";
import { AsciiAddTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/ascii/add/ascii-add.component";
import { AsciiAddTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/ascii/add/ascii-add.component";
import { AsciiAddValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/ascii/add/ascii-add.component";
import { AsciiEditComponent } from "src/assets/examples/reactive-form-validators/decorators/ascii/edit/ascii-edit.component";

export const ASCII_COMPONENT_EXAMPLE_CONSTANT: { [key: string]: any } = {
	decorators:{
						complete : AsciiCompleteComponent,
						conditionalExpression : AsciiConditionalExpressionComponent,
						message : AsciiMessageComponent,
						dynamic : AsciiDynamicComponent,
						add : AsciiAddComponent,
						edit : AsciiEditComponent,
			  },
	template_driven_validation_directives:{
						complete : AsciiCompleteTemplateDrivenValidationDirectivesComponent,
						conditionalExpression : AsciiConditionalExpressionTemplateDrivenValidationDirectivesComponent,
						message : AsciiMessageTemplateDrivenValidationDirectivesComponent,
						add : AsciiAddTemplateDrivenValidationDirectivesComponent,
			  },
	template_driven_validation_decorators:{
						complete : AsciiCompleteTemplateDrivenValidationDecoratorsComponent,
						conditionalExpression : AsciiConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
						message : AsciiMessageTemplateDrivenValidationDecoratorsComponent,
						add : AsciiAddTemplateDrivenValidationDecoratorsComponent,
			  },
	validators:{
						complete : AsciiCompleteValidatorComponent,
						conditionalExpression : AsciiConditionalExpressionValidatorComponent,
						message : AsciiMessageValidatorComponent,
						dynamic : AsciiDynamicValidatorComponent,
						add : AsciiAddValidatorComponent,
			  },
}