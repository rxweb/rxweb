import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { FACTOR_ROUTING } from "src/app/components/form-validation/validators/factor/factor.routing";
import { FactorDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/decorators/factor/factor-decorators-extended.module";
import { FactorValidatorsExtendedModule } from "src/assets/examples/reactive-form-validators/validators/factor/factor-validators-extended.module";
import { FactorTemplateDrivenValidationDirectivesExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/factor/factor-validation-directives-extended.module";
import { FactorTemplateDrivenValidationDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/factor/factor-validation-decorators-extended.module";
import { PageModule } from "src/app/components/form-validation/page/page.module";
import { COMPONENT_EXAMPLE } from "src/app/domain/application.const";
import { FACTOR_COMPONENT_EXAMPLE_CONSTANT } from "src/app/components/form-validation/validators/factor/factor.constants";



@NgModule({
  imports: [FACTOR_ROUTING, FactorDecoratorsExtendedModule, FactorValidatorsExtendedModule, FactorTemplateDrivenValidationDirectivesExtendedModule, FactorTemplateDrivenValidationDecoratorsExtendedModule,PageModule],
  exports: [RouterModule],
  providers:[{ provide: COMPONENT_EXAMPLE, useValue: FACTOR_COMPONENT_EXAMPLE_CONSTANT }]
})
export class FactorModule { }

