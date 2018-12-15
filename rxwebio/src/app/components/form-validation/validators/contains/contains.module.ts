import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { CONTAINS_ROUTING } from "src/app/components/form-validation/validators/contains/contains.routing";
import { ContainsDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/decorators/contains/contains-decorators-extended.module";
import { ContainsValidatorsExtendedModule } from "src/assets/examples/reactive-form-validators/validators/contains/contains-validators-extended.module";
import { ContainsTemplateDrivenValidationDirectivesExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/contains/contains-validation-directives-extended.module";
import { ContainsTemplateDrivenValidationDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/contains/contains-validation-decorators-extended.module";
import { PageModule } from "src/app/components/form-validation/page/page.module";
import { COMPONENT_EXAMPLE } from "src/app/domain/application.const";
import { CONTAINS_COMPONENT_EXAMPLE_CONSTANT } from "src/app/components/form-validation/validators/contains/contains.constants";



@NgModule({
  imports: [CONTAINS_ROUTING, ContainsDecoratorsExtendedModule, ContainsValidatorsExtendedModule, ContainsTemplateDrivenValidationDirectivesExtendedModule, ContainsTemplateDrivenValidationDecoratorsExtendedModule,PageModule],
  exports: [RouterModule],
  providers:[{ provide: COMPONENT_EXAMPLE, useValue: CONTAINS_COMPONENT_EXAMPLE_CONSTANT }]
})
export class ContainsModule { }

