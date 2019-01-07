import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { PrimeNumberDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/decorators/primeNumber/prime-number-decorators-extended.module";
import { PrimeNumberTemplateDrivenValidationDirectivesExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/primeNumber/prime-number-validation-directives-extended.module";
import { PrimeNumberTemplateDrivenValidationDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/primeNumber/prime-number-validation-decorators-extended.module";
import { PrimeNumberValidatorsExtendedModule } from "src/assets/examples/reactive-form-validators/validators/primeNumber/prime-number-validators-extended.module";
import { PRIME_NUMBER_COMPONENT_EXAMPLE_CONSTANT } from "src/app/components/form-validation/primeNumber/prime-number.constants";
import { COMPONENT_EXAMPLE } from "src/app/domain/application.const";
import { PRIME_NUMBER_ROUTING } from "src/app/components/form-validation/primeNumber/prime-number.routing";
import { PageModule } from "src/app/components/page/page.module";



@NgModule({
  imports: [PRIME_NUMBER_ROUTING ,PrimeNumberDecoratorsExtendedModule , PrimeNumberValidatorsExtendedModule ,PrimeNumberTemplateDrivenValidationDirectivesExtendedModule, PrimeNumberTemplateDrivenValidationDecoratorsExtendedModule ,PageModule],
  exports: [RouterModule],
    providers:[{ provide: COMPONENT_EXAMPLE, useValue: PRIME_NUMBER_COMPONENT_EXAMPLE_CONSTANT }]
  })
export class PrimeNumberModule { }

