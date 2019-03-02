import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { EvenDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/decorators/even/even-decorators-extended.module";
import { EvenTemplateDrivenValidationDirectivesExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/even/even-validation-directives-extended.module";
import { EvenTemplateDrivenValidationDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/even/even-validation-decorators-extended.module";

import { EvenValidatorsExtendedModule } from "src/assets/examples/reactive-form-validators/validators/even/even-validators-extended.module";
import { EVEN_COMPONENT_EXAMPLE_CONSTANT } from "src/app/components/form-validation/even/even.constants";
import { COMPONENT_EXAMPLE } from "src/app/domain/application.const";
import { EVEN_ROUTING } from "src/app/components/form-validation/even/even.routing";
import { PageModule } from "src/app/components/page/page.module";



@NgModule({
  imports: [EVEN_ROUTING ,EvenDecoratorsExtendedModule ,EvenValidatorsExtendedModule,EvenTemplateDrivenValidationDirectivesExtendedModule, EvenTemplateDrivenValidationDecoratorsExtendedModule ,PageModule],
  exports: [RouterModule],
    providers:[{ provide: COMPONENT_EXAMPLE, useValue: EVEN_COMPONENT_EXAMPLE_CONSTANT }]
  })
export class EvenModule { }

