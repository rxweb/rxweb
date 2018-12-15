import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { LessThanEqualToDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/decorators/lessThanEqualTo/less-than-equal-to-decorators-extended.module";
import { LessThanEqualToValidatorsExtendedModule } from "src/assets/examples/reactive-form-validators/validators/lessThanEqualTo/less-than-equal-to-validators-extended.module";
import { LessThanEqualToTemplateDrivenValidationDirectivesExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/lessThanEqualTo/less-than-equal-to-validation-directives-extended.module";
import { LessThanEqualToTemplateDrivenValidationDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/lessThanEqualTo/less-than-equal-to-validation-decorators-extended.module";
import { LESS_THAN_EQUAL_TO_COMPONENT_EXAMPLE_CONSTANT } from "src/app/components/form-validation/lessThanEqualTo/less-than-equal-to.constants";
import { COMPONENT_EXAMPLE } from "src/app/domain/application.const";
import { LESS_THAN_EQUAL_TO_ROUTING } from "src/app/components/form-validation/lessThanEqualTo/less-than-equal-to.routing";
import { PageModule } from "src/app/components/page/page.module";



@NgModule({
  imports: [LESS_THAN_EQUAL_TO_ROUTING ,LessThanEqualToDecoratorsExtendedModule, LessThanEqualToValidatorsExtendedModule, LessThanEqualToTemplateDrivenValidationDirectivesExtendedModule, LessThanEqualToTemplateDrivenValidationDecoratorsExtendedModule ,PageModule],
  exports: [RouterModule],
    providers:[{ provide: COMPONENT_EXAMPLE, useValue: LESS_THAN_EQUAL_TO_COMPONENT_EXAMPLE_CONSTANT }]
  })
export class LessThanEqualToModule { }

