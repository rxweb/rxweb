import { FileSizeCompleteComponent } from "src/assets/examples/reactive-form-validators/decorators/fileSize/complete/file-size-complete.component";
import { FileSizeCompleteTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/fileSize/complete/file-size-complete.component";
import { FileSizeCompleteTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/fileSize/complete/file-size-complete.component";
import { FileSizeCompleteValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/fileSize/complete/file-size-complete.component";
import { FileSizeMaxSizeComponent } from "src/assets/examples/reactive-form-validators/decorators/fileSize/maxSize/file-size-max-size.component";
import { FileSizeMaxSizeTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/fileSize/maxSize/file-size-max-size.component";
import { FileSizeMaxSizeTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/fileSize/maxSize/file-size-max-size.component";
import { FileSizeMaxSizeValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/fileSize/maxSize/file-size-max-size.component";
import { FileSizeConditionalExpressionComponent } from "src/assets/examples/reactive-form-validators/decorators/fileSize/conditionalExpression/file-size-conditional-expression.component";
import { FileSizeConditionalExpressionTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/fileSize/conditionalExpression/file-size-conditional-expression.component";
import { FileSizeConditionalExpressionTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/fileSize/conditionalExpression/file-size-conditional-expression.component";
import { FileSizeConditionalExpressionValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/fileSize/conditionalExpression/file-size-conditional-expression.component";
import { FileSizeMessageComponent } from "src/assets/examples/reactive-form-validators/decorators/fileSize/message/file-size-message.component";
import { FileSizeMessageTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/fileSize/message/file-size-message.component";
import { FileSizeMessageTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/fileSize/message/file-size-message.component";
import { FileSizeMessageValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/fileSize/message/file-size-message.component";
import { FileSizeDynamicComponent } from "src/assets/examples/reactive-form-validators/decorators/fileSize/dynamic/file-size-dynamic.component";
import { FileSizeDynamicValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/fileSize/dynamic/file-size-dynamic.component";
import { FileSizeAddComponent } from "src/assets/examples/reactive-form-validators/decorators/fileSize/add/file-size-add.component";
import { FileSizeAddTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/fileSize/add/file-size-add.component";
import { FileSizeAddTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/fileSize/add/file-size-add.component";
import { FileSizeAddValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/fileSize/add/file-size-add.component";
import { FileSizeEditComponent } from "src/assets/examples/reactive-form-validators/decorators/fileSize/edit/file-size-edit.component";

export const FILE_SIZE_COMPONENT_EXAMPLE_CONSTANT: { [key: string]: any } = {
	decorators:{
						complete : FileSizeCompleteComponent,
						maxSize : FileSizeMaxSizeComponent,
						conditionalExpression : FileSizeConditionalExpressionComponent,
						message : FileSizeMessageComponent,
						dynamic : FileSizeDynamicComponent,
						add : FileSizeAddComponent,
						edit : FileSizeEditComponent,
			  },
	validators:{
						complete : FileSizeCompleteValidatorComponent,
						maxSize : FileSizeMaxSizeValidatorComponent,
						conditionalExpression : FileSizeConditionalExpressionValidatorComponent,
						message : FileSizeMessageValidatorComponent,
						dynamic : FileSizeDynamicValidatorComponent,
						add : FileSizeAddValidatorComponent,
			  },
	template_driven_validation_directives:{
						complete : FileSizeCompleteTemplateDrivenValidationDirectivesComponent,
						maxSize : FileSizeMaxSizeTemplateDrivenValidationDirectivesComponent,
						conditionalExpression : FileSizeConditionalExpressionTemplateDrivenValidationDirectivesComponent,
						message : FileSizeMessageTemplateDrivenValidationDirectivesComponent,
						add : FileSizeAddTemplateDrivenValidationDirectivesComponent,
			  },
	template_driven_validation_decorators:{
						complete : FileSizeCompleteTemplateDrivenValidationDecoratorsComponent,
						maxSize : FileSizeMaxSizeTemplateDrivenValidationDecoratorsComponent,
						conditionalExpression : FileSizeConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
						message : FileSizeMessageTemplateDrivenValidationDecoratorsComponent,
						add : FileSizeAddTemplateDrivenValidationDecoratorsComponent,
			  },
}