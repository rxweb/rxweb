import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { TrimDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/decorators/trim/trim-decorators-extended.module";
import { TrimTemplateDrivenValidationDirectivesExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/trim/trim-validation-directives-extended.module";
import { TrimTemplateDrivenValidationDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/trim/trim-validation-decorators-extended.module";
import { TrimValidatorsExtendedModule } from "src/assets/examples/reactive-form-validators/validators/trim/trim-validators-extended.module";
import { TRIM_COMPONENT_EXAMPLE_CONSTANT } from "src/app/components/sanitization/trim/trim.constants";
import { COMPONENT_EXAMPLE } from "src/app/domain/application.const";
import { TRIM_ROUTING } from "src/app/components/sanitization/trim/trim.routing";
import { PageModule } from "src/app/components/page/page.module";



@NgModule({
  imports: [TRIM_ROUTING ,TrimDecoratorsExtendedModule ,PageModule],
  exports: [RouterModule],
    providers:[{ provide: COMPONENT_EXAMPLE, useValue: TRIM_COMPONENT_EXAMPLE_CONSTANT }]
  })
export class TrimModule { }

