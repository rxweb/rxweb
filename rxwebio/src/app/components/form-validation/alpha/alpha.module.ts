import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { AlphaDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/decorators/alpha/alpha-decorators-extended.module";
import { AlphaTemplateDrivenValidationDirectivesExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/alpha/alpha-validation-directives-extended.module";
import { AlphaTemplateDrivenValidationDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/alpha/alpha-validation-decorators-extended.module";
import { AlphaValidatorsExtendedModule } from "src/assets/examples/reactive-form-validators/validators/alpha/alpha-validators-extended.module";
import { ALPHA_COMPONENT_EXAMPLE_CONSTANT } from "src/app/components/form-validation/alpha/alpha.constants";
import { COMPONENT_EXAMPLE } from "src/app/domain/application.const";
import { ALPHA_ROUTING } from "src/app/components/form-validation/alpha/alpha.routing";
import { PageModule } from "src/app/components/page/page.module";



@NgModule({
  imports: [ALPHA_ROUTING ,AlphaDecoratorsExtendedModule , AlphaValidatorsExtendedModule ,AlphaTemplateDrivenValidationDirectivesExtendedModule, AlphaTemplateDrivenValidationDecoratorsExtendedModule ,PageModule],
  exports: [RouterModule],
    providers:[{ provide: COMPONENT_EXAMPLE, useValue: ALPHA_COMPONENT_EXAMPLE_CONSTANT }]
  })
export class AlphaModule { }

