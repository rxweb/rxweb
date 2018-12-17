import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { StartsWithDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/decorators/startsWith/starts-with-decorators-extended.module";
import { StartsWithValidatorsExtendedModule } from "src/assets/examples/reactive-form-validators/validators/startsWith/starts-with-validators-extended.module";
import { StartsWithTemplateDrivenValidationDirectivesExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/startsWith/starts-with-validation-directives-extended.module";
import { StartsWithTemplateDrivenValidationDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/startsWith/starts-with-validation-decorators-extended.module";
import { STARTS_WITH_COMPONENT_EXAMPLE_CONSTANT } from "src/app/components/form-validation/startsWith/starts-with.constants";
import { COMPONENT_EXAMPLE } from "src/app/domain/application.const";
import { STARTS_WITH_ROUTING } from "src/app/components/form-validation/startsWith/starts-with.routing";
import { PageModule } from "src/app/components/page/page.module";



@NgModule({
  imports: [STARTS_WITH_ROUTING ,StartsWithDecoratorsExtendedModule, StartsWithValidatorsExtendedModule, StartsWithTemplateDrivenValidationDirectivesExtendedModule, StartsWithTemplateDrivenValidationDecoratorsExtendedModule ,PageModule],
  exports: [RouterModule],
    providers:[{ provide: COMPONENT_EXAMPLE, useValue: STARTS_WITH_COMPONENT_EXAMPLE_CONSTANT }]
  })
export class StartsWithModule { }

