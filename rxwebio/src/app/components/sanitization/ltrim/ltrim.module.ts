import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { LtrimDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/decorators/ltrim/ltrim-decorators-extended.module";
import { LtrimTemplateDrivenValidationDirectivesExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/ltrim/ltrim-validation-directives-extended.module";
import { LtrimTemplateDrivenValidationDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/ltrim/ltrim-validation-decorators-extended.module";
import { LtrimValidatorsExtendedModule } from "src/assets/examples/reactive-form-validators/validators/ltrim/ltrim-validators-extended.module";
import { LTRIM_COMPONENT_EXAMPLE_CONSTANT } from "src/app/components/sanitization/ltrim/ltrim.constants";
import { COMPONENT_EXAMPLE } from "src/app/domain/application.const";
import { LTRIM_ROUTING } from "src/app/components/sanitization/ltrim/ltrim.routing";
import { PageModule } from "src/app/components/page/page.module";



@NgModule({
  imports: [LTRIM_ROUTING ,LtrimDecoratorsExtendedModule ,PageModule],
  exports: [RouterModule],
    providers:[{ provide: COMPONENT_EXAMPLE, useValue: LTRIM_COMPONENT_EXAMPLE_CONSTANT }]
  })
export class LtrimModule { }

