import { FileSizeCompleteComponent } from "src/assets/examples/reactive-form-validators/decorators/fileSize/complete/file-size-complete.component";
import { FileSizeCompleteTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/fileSize/complete/file-size-complete.component";
import { FileSizeCompleteValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/fileSize/complete/file-size-complete.component";
import { FileSizeMaxSizeComponent } from "src/assets/examples/reactive-form-validators/decorators/fileSize/maxSize/file-size-max-size.component";
import { FileSizeMaxSizeTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/fileSize/maxSize/file-size-max-size.component";
import { FileSizeMaxSizeValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/fileSize/maxSize/file-size-max-size.component";
import { FileSizeConditionalExpressionComponent } from "src/assets/examples/reactive-form-validators/decorators/fileSize/conditionalExpression/file-size-conditional-expression.component";
import { FileSizeConditionalExpressionTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/fileSize/conditionalExpression/file-size-conditional-expression.component";
import { FileSizeConditionalExpressionValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/fileSize/conditionalExpression/file-size-conditional-expression.component";
import { FileSizeMessageComponent } from "src/assets/examples/reactive-form-validators/decorators/fileSize/message/file-size-message.component";
import { FileSizeMessageTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/fileSize/message/file-size-message.component";
import { FileSizeMessageValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/fileSize/message/file-size-message.component";
import { FileSizeDynamicComponent } from "src/assets/examples/reactive-form-validators/decorators/fileSize/dynamic/file-size-dynamic.component";
import { FileSizeDynamicValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/fileSize/dynamic/file-size-dynamic.component";
import { FileSizeAddComponent } from "src/assets/examples/reactive-form-validators/decorators/fileSize/add/file-size-add.component";
import { FileSizeAddTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/fileSize/add/file-size-add.component";
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
	template_driven:{
						complete : FileSizeCompleteTemplateDrivenComponent,
						maxSize : FileSizeMaxSizeTemplateDrivenComponent,
						conditionalExpression : FileSizeConditionalExpressionTemplateDrivenComponent,
						message : FileSizeMessageTemplateDrivenComponent,
						add : FileSizeAddTemplateDrivenComponent,
			  },
}