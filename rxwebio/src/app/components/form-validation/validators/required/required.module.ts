import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { REQUIRED_ROUTING } from "src/app/components/form-validation/validators/required/required.routing";
import { RequiredDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/decorators/required/required-decorators-extended.module";
import { RequiredValidatorsExtendedModule } from "src/assets/examples/reactive-form-validators/validators/required/required-validators-extended.module";
import { RequiredTemplateDrivenValidationDirectivesExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/required/required-validation-directives-extended.module";
import { RequiredTemplateDrivenValidationDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/required/required-validation-decorators-extended.module";
import { PageModule } from "src/app/components/form-validation/page/page.module";
import { COMPONENT_EXAMPLE } from "src/app/domain/application.const";
import { REQUIRED_COMPONENT_EXAMPLE_CONSTANT } from "src/app/components/form-validation/validators/required/required.constants";



@NgModule({
  imports: [REQUIRED_ROUTING, RequiredDecoratorsExtendedModule, RequiredValidatorsExtendedModule, RequiredTemplateDrivenValidationDirectivesExtendedModule, RequiredTemplateDrivenValidationDecoratorsExtendedModule,PageModule],
  exports: [RouterModule],
  providers:[{ provide: COMPONENT_EXAMPLE, useValue: REQUIRED_COMPONENT_EXAMPLE_CONSTANT }]
})
export class RequiredModule { }

