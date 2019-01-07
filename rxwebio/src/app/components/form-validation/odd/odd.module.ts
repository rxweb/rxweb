import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { OddDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/decorators/odd/odd-decorators-extended.module";
import { OddTemplateDrivenValidationDirectivesExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/odd/odd-validation-directives-extended.module";
import { OddTemplateDrivenValidationDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/odd/odd-validation-decorators-extended.module";
import { OddValidatorsExtendedModule } from "src/assets/examples/reactive-form-validators/validators/odd/odd-validators-extended.module";
import { ODD_COMPONENT_EXAMPLE_CONSTANT } from "src/app/components/form-validation/odd/odd.constants";
import { COMPONENT_EXAMPLE } from "src/app/domain/application.const";
import { ODD_ROUTING } from "src/app/components/form-validation/odd/odd.routing";
import { PageModule } from "src/app/components/page/page.module";



@NgModule({
  imports: [ODD_ROUTING ,OddDecoratorsExtendedModule , OddValidatorsExtendedModule ,OddTemplateDrivenValidationDirectivesExtendedModule, OddTemplateDrivenValidationDecoratorsExtendedModule ,PageModule],
  exports: [RouterModule],
    providers:[{ provide: COMPONENT_EXAMPLE, useValue: ODD_COMPONENT_EXAMPLE_CONSTANT }]
  })
export class OddModule { }

