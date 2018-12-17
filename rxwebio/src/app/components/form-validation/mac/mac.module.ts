import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { MacDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/decorators/mac/mac-decorators-extended.module";
import { MacValidatorsExtendedModule } from "src/assets/examples/reactive-form-validators/validators/mac/mac-validators-extended.module";
import { MacTemplateDrivenValidationDirectivesExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/mac/mac-validation-directives-extended.module";
import { MacTemplateDrivenValidationDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/mac/mac-validation-decorators-extended.module";
import { MAC_COMPONENT_EXAMPLE_CONSTANT } from "src/app/components/form-validation/mac/mac.constants";
import { COMPONENT_EXAMPLE } from "src/app/domain/application.const";
import { MAC_ROUTING } from "src/app/components/form-validation/mac/mac.routing";
import { PageModule } from "src/app/components/page/page.module";



@NgModule({
  imports: [MAC_ROUTING ,MacDecoratorsExtendedModule, MacValidatorsExtendedModule, MacTemplateDrivenValidationDirectivesExtendedModule, MacTemplateDrivenValidationDecoratorsExtendedModule ,PageModule],
  exports: [RouterModule],
    providers:[{ provide: COMPONENT_EXAMPLE, useValue: MAC_COMPONENT_EXAMPLE_CONSTANT }]
  })
export class MacModule { }

