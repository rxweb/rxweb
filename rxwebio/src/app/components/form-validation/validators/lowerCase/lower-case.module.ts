import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { LOWER_CASE_ROUTING } from "src/app/components/form-validation/validators/lowerCase/lower-case.routing";
import { LowerCaseDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/decorators/lowerCase/lower-case-decorators-extended.module";
import { LowerCaseValidatorsExtendedModule } from "src/assets/examples/reactive-form-validators/validators/lowerCase/lower-case-validators-extended.module";
import { LowerCaseTemplateDrivenValidationDirectivesExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/lowerCase/lower-case-validation-directives-extended.module";
import { LowerCaseTemplateDrivenValidationDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/lowerCase/lower-case-validation-decorators-extended.module";
import { PageModule } from "src/app/components/form-validation/page/page.module";
import { COMPONENT_EXAMPLE } from "src/app/domain/application.const";
import { LOWER_CASE_COMPONENT_EXAMPLE_CONSTANT } from "src/app/components/form-validation/validators/lowerCase/lower-case.constants";



@NgModule({
  imports: [LOWER_CASE_ROUTING, LowerCaseDecoratorsExtendedModule, LowerCaseValidatorsExtendedModule, LowerCaseTemplateDrivenValidationDirectivesExtendedModule, LowerCaseTemplateDrivenValidationDecoratorsExtendedModule,PageModule],
  exports: [RouterModule],
  providers:[{ provide: COMPONENT_EXAMPLE, useValue: LOWER_CASE_COMPONENT_EXAMPLE_CONSTANT }]
})
export class LowerCaseModule { }

