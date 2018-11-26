import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { PRIME_NUMBER_ROUTING } from "src/app/components/form-validation/validators/primeNumber/prime-number.routing";
import { PrimeNumberDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/decorators/primeNumber/prime-number-decorators-extended.module";
import { PrimeNumberValidatorsExtendedModule } from "src/assets/examples/reactive-form-validators/validators/primeNumber/prime-number-validators-extended.module";
import { PrimeNumberTemplateDrivenExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/primeNumber/prime-number-template-driven-extended.module";
import { PageModule } from "src/app/components/form-validation/page/page.module";
import { COMPONENT_EXAMPLE } from "src/app/domain/application.const";
import { PRIME_NUMBER_COMPONENT_EXAMPLE_CONSTANT } from "src/app/components/form-validation/validators/primeNumber/prime-number.constants";



@NgModule({
  imports: [PRIME_NUMBER_ROUTING, PrimeNumberDecoratorsExtendedModule, PrimeNumberValidatorsExtendedModule, PrimeNumberTemplateDrivenExtendedModule,PageModule],
  exports: [RouterModule],
  providers:[{ provide: COMPONENT_EXAMPLE, useValue: PRIME_NUMBER_COMPONENT_EXAMPLE_CONSTANT }]
})
export class PrimeNumberModule { }

