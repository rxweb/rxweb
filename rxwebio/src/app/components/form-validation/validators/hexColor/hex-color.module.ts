import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { HEX_COLOR_ROUTING } from "src/app/components/form-validation/validators/hexColor/hex-color.routing";
import { HexColorDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/decorators/hexColor/hex-color-decorators-extended.module";
import { HexColorValidatorsExtendedModule } from "src/assets/examples/reactive-form-validators/validators/hexColor/hex-color-validators-extended.module";
import { HexColorTemplateDrivenValidationDirectivesExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/hexColor/hex-color-validation-directives-extended.module";
import { HexColorTemplateDrivenValidationDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/hexColor/hex-color-validation-decorators-extended.module";
import { PageModule } from "src/app/components/form-validation/page/page.module";
import { COMPONENT_EXAMPLE } from "src/app/domain/application.const";
import { HEX_COLOR_COMPONENT_EXAMPLE_CONSTANT } from "src/app/components/form-validation/validators/hexColor/hex-color.constants";



@NgModule({
  imports: [HEX_COLOR_ROUTING, HexColorDecoratorsExtendedModule, HexColorValidatorsExtendedModule, HexColorTemplateDrivenValidationDirectivesExtendedModule, HexColorTemplateDrivenValidationDecoratorsExtendedModule,PageModule],
  exports: [RouterModule],
  providers:[{ provide: COMPONENT_EXAMPLE, useValue: HEX_COLOR_COMPONENT_EXAMPLE_CONSTANT }]
})
export class HexColorModule { }

