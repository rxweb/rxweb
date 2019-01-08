import { FileCompleteComponent } from "src/assets/examples/reactive-form-validators/decorators/file/complete/file-complete.component";
import { FileCompleteTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/file/complete/file-complete.component";
import { FileCompleteTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/file/complete/file-complete.component";
import { FileCompleteValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/file/complete/file-complete.component";
import { FileMaxFilesComponent } from "src/assets/examples/reactive-form-validators/decorators/file/maxFiles/file-max-files.component";
import { FileMaxFilesTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/file/maxFiles/file-max-files.component";
import { FileMaxFilesTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/file/maxFiles/file-max-files.component";
import { FileMaxFilesValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/file/maxFiles/file-max-files.component";
import { FileMinFilesComponent } from "src/assets/examples/reactive-form-validators/decorators/file/minFiles/file-min-files.component";
import { FileMinFilesTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/file/minFiles/file-min-files.component";
import { FileMinFilesTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/file/minFiles/file-min-files.component";
import { FileMinFilesValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/file/minFiles/file-min-files.component";
import { FileConditionalExpressionComponent } from "src/assets/examples/reactive-form-validators/decorators/file/conditionalExpression/file-conditional-expression.component";
import { FileConditionalExpressionTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/file/conditionalExpression/file-conditional-expression.component";
import { FileConditionalExpressionTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/file/conditionalExpression/file-conditional-expression.component";
import { FileConditionalExpressionValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/file/conditionalExpression/file-conditional-expression.component";
import { FileMessageComponent } from "src/assets/examples/reactive-form-validators/decorators/file/message/file-message.component";
import { FileMessageTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/file/message/file-message.component";
import { FileMessageTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/file/message/file-message.component";
import { FileMessageValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/file/message/file-message.component";
import { FileDynamicComponent } from "src/assets/examples/reactive-form-validators/decorators/file/dynamic/file-dynamic.component";
import { FileDynamicValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/file/dynamic/file-dynamic.component";
import { FileAddComponent } from "src/assets/examples/reactive-form-validators/decorators/file/add/file-add.component";
import { FileAddTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/file/add/file-add.component";
import { FileAddTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/file/add/file-add.component";
import { FileAddValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/file/add/file-add.component";
import { FileEditComponent } from "src/assets/examples/reactive-form-validators/decorators/file/edit/file-edit.component";

export const FILE_COMPONENT_EXAMPLE_CONSTANT: { [key: string]: any } = {
	decorators:{
						complete : FileCompleteComponent,
						maxFiles : FileMaxFilesComponent,
						minFiles : FileMinFilesComponent,
						conditionalExpression : FileConditionalExpressionComponent,
						message : FileMessageComponent,
						dynamic : FileDynamicComponent,
						add : FileAddComponent,
						edit : FileEditComponent,
			  },
	template_driven_validation_directives:{
						complete : FileCompleteTemplateDrivenValidationDirectivesComponent,
						maxFiles : FileMaxFilesTemplateDrivenValidationDirectivesComponent,
						minFiles : FileMinFilesTemplateDrivenValidationDirectivesComponent,
						conditionalExpression : FileConditionalExpressionTemplateDrivenValidationDirectivesComponent,
						message : FileMessageTemplateDrivenValidationDirectivesComponent,
						add : FileAddTemplateDrivenValidationDirectivesComponent,
			  },
	template_driven_validation_decorators:{
						complete : FileCompleteTemplateDrivenValidationDecoratorsComponent,
						maxFiles : FileMaxFilesTemplateDrivenValidationDecoratorsComponent,
						minFiles : FileMinFilesTemplateDrivenValidationDecoratorsComponent,
						conditionalExpression : FileConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
						message : FileMessageTemplateDrivenValidationDecoratorsComponent,
						add : FileAddTemplateDrivenValidationDecoratorsComponent,
			  },
	validators:{
						complete : FileCompleteValidatorComponent,
						maxFiles : FileMaxFilesValidatorComponent,
						minFiles : FileMinFilesValidatorComponent,
						conditionalExpression : FileConditionalExpressionValidatorComponent,
						message : FileMessageValidatorComponent,
						dynamic : FileDynamicValidatorComponent,
						add : FileAddValidatorComponent,
			  },
}