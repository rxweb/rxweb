import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { GreaterThanEqualToDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/decorators/greaterThanEqualTo/greater-than-equal-to-decorators-extended.module";
import { GreaterThanEqualToTemplateDrivenValidationDirectivesExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/greaterThanEqualTo/greater-than-equal-to-validation-directives-extended.module";
import { GreaterThanEqualToTemplateDrivenValidationDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/greaterThanEqualTo/greater-than-equal-to-validation-decorators-extended.module";
import { GreaterThanEqualToValidatorsExtendedModule } from "src/assets/examples/reactive-form-validators/validators/greaterThanEqualTo/greater-than-equal-to-validators-extended.module";
import { GREATER_THAN_EQUAL_TO_COMPONENT_EXAMPLE_CONSTANT } from "src/app/components/form-validation/greaterThanEqualTo/greater-than-equal-to.constants";
import { COMPONENT_EXAMPLE } from "src/app/domain/application.const";
import { GREATER_THAN_EQUAL_TO_ROUTING } from "src/app/components/form-validation/greaterThanEqualTo/greater-than-equal-to.routing";
import { PageModule } from "src/app/components/page/page.module";


@NgModule({
  imports: [GREATER_THAN_EQUAL_TO_ROUTING ,GreaterThanEqualToDecoratorsExtendedModule , GreaterThanEqualToValidatorsExtendedModule ,GreaterThanEqualToTemplateDrivenValidationDirectivesExtendedModule, GreaterThanEqualToTemplateDrivenValidationDecoratorsExtendedModule ,PageModule,],
  exports: [RouterModule],
    providers:[{ provide: COMPONENT_EXAMPLE, useValue: GREATER_THAN_EQUAL_TO_COMPONENT_EXAMPLE_CONSTANT }]
  })
export class GreaterThanEqualToModule { }

