import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { DIGIT_ROUTING } from "src/app/components/form-validation/validators/digit/digit.routing";
import { DigitDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/decorators/digit/digit-decorators-extended.module";
import { DigitValidatorsExtendedModule } from "src/assets/examples/reactive-form-validators/validators/digit/digit-validators-extended.module";
import { DigitTemplateDrivenValidationDirectivesExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/digit/digit-validation-directives-extended.module";
import { DigitTemplateDrivenValidationDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/digit/digit-validation-decorators-extended.module";
import { PageModule } from "src/app/components/form-validation/page/page.module";
import { COMPONENT_EXAMPLE } from "src/app/domain/application.const";
import { DIGIT_COMPONENT_EXAMPLE_CONSTANT } from "src/app/components/form-validation/validators/digit/digit.constants";



@NgModule({
  imports: [DIGIT_ROUTING, DigitDecoratorsExtendedModule, DigitValidatorsExtendedModule, DigitTemplateDrivenValidationDirectivesExtendedModule, DigitTemplateDrivenValidationDecoratorsExtendedModule,PageModule],
  exports: [RouterModule],
  providers:[{ provide: COMPONENT_EXAMPLE, useValue: DIGIT_COMPONENT_EXAMPLE_CONSTANT }]
})
export class DigitModule { }

