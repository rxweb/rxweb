import { ImageCompleteComponent } from "src/assets/examples/reactive-form-validators/decorators/image/complete/image-complete.component";
import { ImageCompleteTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/image/complete/image-complete.component";
import { ImageCompleteTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/image/complete/image-complete.component";
import { ImageCompleteValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/image/complete/image-complete.component";
import { ImageMaxHeightComponent } from "src/assets/examples/reactive-form-validators/decorators/image/maxHeight/image-max-height.component";
import { ImageMaxHeightTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/image/maxHeight/image-max-height.component";
import { ImageMaxHeightTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/image/maxHeight/image-max-height.component";
import { ImageMaxHeightValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/image/maxHeight/image-max-height.component";
import { ImageMaxWidthComponent } from "src/assets/examples/reactive-form-validators/decorators/image/maxWidth/image-max-width.component";
import { ImageMaxWidthTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/image/maxWidth/image-max-width.component";
import { ImageMaxWidthTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/image/maxWidth/image-max-width.component";
import { ImageMaxWidthValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/image/maxWidth/image-max-width.component";
import { ImageMinHeightComponent } from "src/assets/examples/reactive-form-validators/decorators/image/minHeight/image-min-height.component";
import { ImageMinHeightTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/image/minHeight/image-min-height.component";
import { ImageMinHeightTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/image/minHeight/image-min-height.component";
import { ImageMinHeightValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/image/minHeight/image-min-height.component";
import { ImageMinWidthComponent } from "src/assets/examples/reactive-form-validators/decorators/image/minWidth/image-min-width.component";
import { ImageMinWidthTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/image/minWidth/image-min-width.component";
import { ImageMinWidthTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/image/minWidth/image-min-width.component";
import { ImageMinWidthValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/image/minWidth/image-min-width.component";
import { ImageConditionalExpressionComponent } from "src/assets/examples/reactive-form-validators/decorators/image/conditionalExpression/image-conditional-expression.component";
import { ImageConditionalExpressionTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/image/conditionalExpression/image-conditional-expression.component";
import { ImageConditionalExpressionTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/image/conditionalExpression/image-conditional-expression.component";
import { ImageConditionalExpressionValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/image/conditionalExpression/image-conditional-expression.component";
import { ImageMessageComponent } from "src/assets/examples/reactive-form-validators/decorators/image/message/image-message.component";
import { ImageMessageTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/image/message/image-message.component";
import { ImageMessageTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/image/message/image-message.component";
import { ImageMessageValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/image/message/image-message.component";
import { ImageDynamicComponent } from "src/assets/examples/reactive-form-validators/decorators/image/dynamic/image-dynamic.component";
import { ImageDynamicValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/image/dynamic/image-dynamic.component";
import { ImageAddComponent } from "src/assets/examples/reactive-form-validators/decorators/image/add/image-add.component";
import { ImageAddTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/image/add/image-add.component";
import { ImageAddTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/image/add/image-add.component";
import { ImageAddValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/image/add/image-add.component";
import { ImageEditComponent } from "src/assets/examples/reactive-form-validators/decorators/image/edit/image-edit.component";

export const IMAGE_COMPONENT_EXAMPLE_CONSTANT: { [key: string]: any } = {
	decorators:{
						complete : ImageCompleteComponent,
						maxHeight : ImageMaxHeightComponent,
						maxWidth : ImageMaxWidthComponent,
						minHeight : ImageMinHeightComponent,
						minWidth : ImageMinWidthComponent,
						conditionalExpression : ImageConditionalExpressionComponent,
						message : ImageMessageComponent,
						dynamic : ImageDynamicComponent,
						add : ImageAddComponent,
						edit : ImageEditComponent,
			  },
	template_driven_validation_directives:{
						complete : ImageCompleteTemplateDrivenValidationDirectivesComponent,
						maxHeight : ImageMaxHeightTemplateDrivenValidationDirectivesComponent,
						maxWidth : ImageMaxWidthTemplateDrivenValidationDirectivesComponent,
						minHeight : ImageMinHeightTemplateDrivenValidationDirectivesComponent,
						minWidth : ImageMinWidthTemplateDrivenValidationDirectivesComponent,
						conditionalExpression : ImageConditionalExpressionTemplateDrivenValidationDirectivesComponent,
						message : ImageMessageTemplateDrivenValidationDirectivesComponent,
						add : ImageAddTemplateDrivenValidationDirectivesComponent,
			  },
	template_driven_validation_decorators:{
						complete : ImageCompleteTemplateDrivenValidationDecoratorsComponent,
						maxHeight : ImageMaxHeightTemplateDrivenValidationDecoratorsComponent,
						maxWidth : ImageMaxWidthTemplateDrivenValidationDecoratorsComponent,
						minHeight : ImageMinHeightTemplateDrivenValidationDecoratorsComponent,
						minWidth : ImageMinWidthTemplateDrivenValidationDecoratorsComponent,
						conditionalExpression : ImageConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
						message : ImageMessageTemplateDrivenValidationDecoratorsComponent,
						add : ImageAddTemplateDrivenValidationDecoratorsComponent,
			  },
	validators:{
						complete : ImageCompleteValidatorComponent,
						maxHeight : ImageMaxHeightValidatorComponent,
						maxWidth : ImageMaxWidthValidatorComponent,
						minHeight : ImageMinHeightValidatorComponent,
						minWidth : ImageMinWidthValidatorComponent,
						conditionalExpression : ImageConditionalExpressionValidatorComponent,
						message : ImageMessageValidatorComponent,
						dynamic : ImageDynamicValidatorComponent,
						add : ImageAddValidatorComponent,
			  },
}