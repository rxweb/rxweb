import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { DifferentDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/decorators/different/different-decorators-extended.module";
import { DifferentTemplateDrivenValidationDirectivesExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/different/different-validation-directives-extended.module";
import { DifferentTemplateDrivenValidationDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/different/different-validation-decorators-extended.module";
import { DifferentValidatorsExtendedModule } from "src/assets/examples/reactive-form-validators/validators/different/different-validators-extended.module";
import { DIFFERENT_COMPONENT_EXAMPLE_CONSTANT } from "src/app/components/form-validation/different/different.constants";
import { COMPONENT_EXAMPLE } from "src/app/domain/application.const";
import { DIFFERENT_ROUTING } from "src/app/components/form-validation/different/different.routing";
import { PageModule } from "src/app/components/page/page.module";


@NgModule({
  imports: [DIFFERENT_ROUTING ,DifferentDecoratorsExtendedModule , DifferentValidatorsExtendedModule ,DifferentTemplateDrivenValidationDirectivesExtendedModule, DifferentTemplateDrivenValidationDecoratorsExtendedModule ,PageModule,],
  exports: [RouterModule],
    providers:[{ provide: COMPONENT_EXAMPLE, useValue: DIFFERENT_COMPONENT_EXAMPLE_CONSTANT }]
  })
export class DifferentModule { }

