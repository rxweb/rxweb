import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { ALPHA_NUMERIC_ROUTING } from "src/app/components/form-validation/validators/alphaNumeric/alpha-numeric.routing";
import { AlphaNumericDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/decorators/alphaNumeric/alpha-numeric-decorators-extended.module";
import { AlphaNumericValidatorsExtendedModule } from "src/assets/examples/reactive-form-validators/validators/alphaNumeric/alpha-numeric-validators-extended.module";
import { AlphaNumericTemplateDrivenValidationDirectivesExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/alphaNumeric/alpha-numeric-validation-directives-extended.module";
import { AlphaNumericTemplateDrivenValidationDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/alphaNumeric/alpha-numeric-validation-decorators-extended.module";
import { PageModule } from "src/app/components/form-validation/page/page.module";
import { COMPONENT_EXAMPLE } from "src/app/domain/application.const";
import { ALPHA_NUMERIC_COMPONENT_EXAMPLE_CONSTANT } from "src/app/components/form-validation/validators/alphaNumeric/alpha-numeric.constants";



@NgModule({
  imports: [ALPHA_NUMERIC_ROUTING, AlphaNumericDecoratorsExtendedModule, AlphaNumericValidatorsExtendedModule, AlphaNumericTemplateDrivenValidationDirectivesExtendedModule, AlphaNumericTemplateDrivenValidationDecoratorsExtendedModule,PageModule],
  exports: [RouterModule],
  providers:[{ provide: COMPONENT_EXAMPLE, useValue: ALPHA_NUMERIC_COMPONENT_EXAMPLE_CONSTANT }]
})
export class AlphaNumericModule { }

