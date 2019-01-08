import { CompareCompleteComponent } from "src/assets/examples/reactive-form-validators/decorators/compare/complete/compare-complete.component";
import { CompareCompleteTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/compare/complete/compare-complete.component";
import { CompareCompleteTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/compare/complete/compare-complete.component";
import { CompareCompleteValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/compare/complete/compare-complete.component";
import { CompareFieldNameComponent } from "src/assets/examples/reactive-form-validators/decorators/compare/fieldName/compare-field-name.component";
import { CompareFieldNameTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/compare/fieldName/compare-field-name.component";
import { CompareFieldNameTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/compare/fieldName/compare-field-name.component";
import { CompareFieldNameValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/compare/fieldName/compare-field-name.component";
import { CompareMessageComponent } from "src/assets/examples/reactive-form-validators/decorators/compare/message/compare-message.component";
import { CompareMessageTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/compare/message/compare-message.component";
import { CompareMessageTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/compare/message/compare-message.component";
import { CompareMessageValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/compare/message/compare-message.component";
import { CompareDynamicComponent } from "src/assets/examples/reactive-form-validators/decorators/compare/dynamic/compare-dynamic.component";
import { CompareDynamicValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/compare/dynamic/compare-dynamic.component";
import { CompareAddComponent } from "src/assets/examples/reactive-form-validators/decorators/compare/add/compare-add.component";
import { CompareAddTemplateDrivenValidationDirectivesComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/compare/add/compare-add.component";
import { CompareAddTemplateDrivenValidationDecoratorsComponent } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/compare/add/compare-add.component";
import { CompareAddValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/compare/add/compare-add.component";
import { CompareEditComponent } from "src/assets/examples/reactive-form-validators/decorators/compare/edit/compare-edit.component";

export const COMPARE_COMPONENT_EXAMPLE_CONSTANT: { [key: string]: any } = {
	decorators:{
						complete : CompareCompleteComponent,
						fieldName : CompareFieldNameComponent,
						message : CompareMessageComponent,
						dynamic : CompareDynamicComponent,
						add : CompareAddComponent,
						edit : CompareEditComponent,
			  },
	template_driven_validation_directives:{
						complete : CompareCompleteTemplateDrivenValidationDirectivesComponent,
						fieldName : CompareFieldNameTemplateDrivenValidationDirectivesComponent,
						message : CompareMessageTemplateDrivenValidationDirectivesComponent,
						add : CompareAddTemplateDrivenValidationDirectivesComponent,
			  },
	template_driven_validation_decorators:{
						complete : CompareCompleteTemplateDrivenValidationDecoratorsComponent,
						fieldName : CompareFieldNameTemplateDrivenValidationDecoratorsComponent,
						message : CompareMessageTemplateDrivenValidationDecoratorsComponent,
						add : CompareAddTemplateDrivenValidationDecoratorsComponent,
			  },
	validators:{
						complete : CompareCompleteValidatorComponent,
						fieldName : CompareFieldNameValidatorComponent,
						message : CompareMessageValidatorComponent,
						dynamic : CompareDynamicValidatorComponent,
						add : CompareAddValidatorComponent,
			  },
}