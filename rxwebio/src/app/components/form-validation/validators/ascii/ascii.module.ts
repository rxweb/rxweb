import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { ASCII_ROUTING } from "src/app/components/form-validation/validators/ascii/ascii.routing";
import { AsciiDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/decorators/ascii/ascii-decorators-extended.module";
import { AsciiValidatorsExtendedModule } from "src/assets/examples/reactive-form-validators/validators/ascii/ascii-validators-extended.module";
import { AsciiTemplateDrivenValidationDirectivesExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/ascii/ascii-validation-directives-extended.module";
import { AsciiTemplateDrivenValidationDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/ascii/ascii-validation-decorators-extended.module";
import { PageModule } from "src/app/components/form-validation/page/page.module";
import { COMPONENT_EXAMPLE } from "src/app/domain/application.const";
import { ASCII_COMPONENT_EXAMPLE_CONSTANT } from "src/app/components/form-validation/validators/ascii/ascii.constants";



@NgModule({
  imports: [ASCII_ROUTING, AsciiDecoratorsExtendedModule, AsciiValidatorsExtendedModule, AsciiTemplateDrivenValidationDirectivesExtendedModule, AsciiTemplateDrivenValidationDecoratorsExtendedModule,PageModule],
  exports: [RouterModule],
  providers:[{ provide: COMPONENT_EXAMPLE, useValue: ASCII_COMPONENT_EXAMPLE_CONSTANT }]
})
export class AsciiModule { }

