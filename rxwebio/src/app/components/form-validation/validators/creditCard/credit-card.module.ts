import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { CREDIT_CARD_ROUTING } from "src/app/components/form-validation/validators/creditCard/credit-card.routing";
import { CreditCardDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/decorators/creditCard/credit-card-decorators-extended.module";
import { CreditCardValidatorsExtendedModule } from "src/assets/examples/reactive-form-validators/validators/creditCard/credit-card-validators-extended.module";
import { CreditCardTemplateDrivenValidationDirectivesExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/creditCard/credit-card-validation-directives-extended.module";
import { CreditCardTemplateDrivenValidationDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/creditCard/credit-card-validation-decorators-extended.module";
import { PageModule } from "src/app/components/form-validation/page/page.module";
import { COMPONENT_EXAMPLE } from "src/app/domain/application.const";
import { CREDIT_CARD_COMPONENT_EXAMPLE_CONSTANT } from "src/app/components/form-validation/validators/creditCard/credit-card.constants";



@NgModule({
  imports: [CREDIT_CARD_ROUTING, CreditCardDecoratorsExtendedModule, CreditCardValidatorsExtendedModule, CreditCardTemplateDrivenValidationDirectivesExtendedModule, CreditCardTemplateDrivenValidationDecoratorsExtendedModule,PageModule],
  exports: [RouterModule],
  providers:[{ provide: COMPONENT_EXAMPLE, useValue: CREDIT_CARD_COMPONENT_EXAMPLE_CONSTANT }]
})
export class CreditCardModule { }

