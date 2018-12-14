import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { GreaterThanDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/decorators/greaterThan/greater-than-decorators-extended.module";
import { GreaterThanValidatorsExtendedModule } from "src/assets/examples/reactive-form-validators/validators/greaterThan/greater-than-validators-extended.module";
import { GreaterThanTemplateDrivenValidationDirectivesExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/greaterThan/greater-than-validation-directives-extended.module";
import { GreaterThanTemplateDrivenValidationDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/greaterThan/greater-than-validation-decorators-extended.module";
import { GREATER_THAN_COMPONENT_EXAMPLE_CONSTANT } from "src/app/components/form-validation/greaterThan/greater-than.constants";
import { COMPONENT_EXAMPLE } from "src/app/domain/application.const";
import { GREATER_THAN_ROUTING } from "src/app/components/form-validation/greaterThan/greater-than.routing";
import { PageModule } from "src/app/components/page/page.module";



@NgModule({
  imports: [GREATER_THAN_ROUTING ,GreaterThanDecoratorsExtendedModule, GreaterThanValidatorsExtendedModule, GreaterThanTemplateDrivenValidationDirectivesExtendedModule, GreaterThanTemplateDrivenValidationDecoratorsExtendedModule ,PageModule],
  exports: [RouterModule],
    providers:[{ provide: COMPONENT_EXAMPLE, useValue: GREATER_THAN_COMPONENT_EXAMPLE_CONSTANT }]
  })
export class GreaterThanModule { }

