import { CompareCompleteComponent } from "src/assets/examples/reactive-form-validators/decorators/compare/complete/compare-complete.component";
import { CompareCompleteTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/compare/complete/compare-complete.component";
import { CompareCompleteValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/compare/complete/compare-complete.component";
import { CompareFieldNameComponent } from "src/assets/examples/reactive-form-validators/decorators/compare/fieldName/compare-field-name.component";
import { CompareFieldNameTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/compare/fieldName/compare-field-name.component";
import { CompareFieldNameValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/compare/fieldName/compare-field-name.component";
import { CompareMessageComponent } from "src/assets/examples/reactive-form-validators/decorators/compare/message/compare-message.component";
import { CompareMessageTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/compare/message/compare-message.component";
import { CompareMessageValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/compare/message/compare-message.component";
import { CompareDynamicComponent } from "src/assets/examples/reactive-form-validators/decorators/compare/dynamic/compare-dynamic.component";
import { CompareDynamicValidatorComponent } from "src/assets/examples/reactive-form-validators/validators/compare/dynamic/compare-dynamic.component";
import { CompareAddComponent } from "src/assets/examples/reactive-form-validators/decorators/compare/add/compare-add.component";
import { CompareAddTemplateDrivenComponent } from "src/assets/examples/reactive-form-validators/template-driven/compare/add/compare-add.component";
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
	validators:{
						complete : CompareCompleteValidatorComponent,
						fieldName : CompareFieldNameValidatorComponent,
						message : CompareMessageValidatorComponent,
						dynamic : CompareDynamicValidatorComponent,
						add : CompareAddValidatorComponent,
			  },
	template_driven:{
						complete : CompareCompleteTemplateDrivenComponent,
						fieldName : CompareFieldNameTemplateDrivenComponent,
						message : CompareMessageTemplateDrivenComponent,
						add : CompareAddTemplateDrivenComponent,
			  },
}