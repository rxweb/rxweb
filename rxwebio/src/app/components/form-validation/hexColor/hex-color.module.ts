import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { HexColorDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/decorators/hexColor/hex-color-decorators-extended.module";
import { HexColorTemplateDrivenValidationDirectivesExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/hexColor/hex-color-validation-directives-extended.module";
import { HexColorTemplateDrivenValidationDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/hexColor/hex-color-validation-decorators-extended.module";

import { HexColorValidatorsExtendedModule } from "src/assets/examples/reactive-form-validators/validators/hexColor/hex-color-validators-extended.module";
import { HEX_COLOR_COMPONENT_EXAMPLE_CONSTANT } from "src/app/components/form-validation/hexColor/hex-color.constants";
import { COMPONENT_EXAMPLE } from "src/app/domain/application.const";
import { HEX_COLOR_ROUTING } from "src/app/components/form-validation/hexColor/hex-color.routing";
import { PageModule } from "src/app/components/page/page.module";



@NgModule({
  imports: [HEX_COLOR_ROUTING ,HexColorDecoratorsExtendedModule ,HexColorValidatorsExtendedModule,HexColorTemplateDrivenValidationDirectivesExtendedModule, HexColorTemplateDrivenValidationDecoratorsExtendedModule ,PageModule],
  exports: [RouterModule],
    providers:[{ provide: COMPONENT_EXAMPLE, useValue: HEX_COLOR_COMPONENT_EXAMPLE_CONSTANT }]
  })
export class HexColorModule { }

