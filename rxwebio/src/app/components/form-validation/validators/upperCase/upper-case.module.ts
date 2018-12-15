import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { UPPER_CASE_ROUTING } from "src/app/components/form-validation/validators/upperCase/upper-case.routing";
import { UpperCaseDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/decorators/upperCase/upper-case-decorators-extended.module";
import { UpperCaseValidatorsExtendedModule } from "src/assets/examples/reactive-form-validators/validators/upperCase/upper-case-validators-extended.module";
import { UpperCaseTemplateDrivenValidationDirectivesExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/upperCase/upper-case-validation-directives-extended.module";
import { UpperCaseTemplateDrivenValidationDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/upperCase/upper-case-validation-decorators-extended.module";
import { PageModule } from "src/app/components/form-validation/page/page.module";
import { COMPONENT_EXAMPLE } from "src/app/domain/application.const";
import { UPPER_CASE_COMPONENT_EXAMPLE_CONSTANT } from "src/app/components/form-validation/validators/upperCase/upper-case.constants";



@NgModule({
  imports: [UPPER_CASE_ROUTING, UpperCaseDecoratorsExtendedModule, UpperCaseValidatorsExtendedModule, UpperCaseTemplateDrivenValidationDirectivesExtendedModule, UpperCaseTemplateDrivenValidationDecoratorsExtendedModule,PageModule],
  exports: [RouterModule],
  providers:[{ provide: COMPONENT_EXAMPLE, useValue: UPPER_CASE_COMPONENT_EXAMPLE_CONSTANT }]
})
export class UpperCaseModule { }

