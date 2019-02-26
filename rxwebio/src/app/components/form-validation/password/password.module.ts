import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { PasswordDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/decorators/password/password-decorators-extended.module";
import { PasswordTemplateDrivenValidationDirectivesExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/password/password-validation-directives-extended.module";
import { PasswordTemplateDrivenValidationDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/password/password-validation-decorators-extended.module";
import { PasswordValidatorsExtendedModule } from "src/assets/examples/reactive-form-validators/validators/password/password-validators-extended.module";
import { PASSWORD_COMPONENT_EXAMPLE_CONSTANT } from "src/app/components/form-validation/password/password.constants";
import { COMPONENT_EXAMPLE } from "src/app/domain/application.const";
import { PASSWORD_ROUTING } from "src/app/components/form-validation/password/password.routing";
import { PageModule } from "src/app/components/page/page.module";



@NgModule({
  imports: [PASSWORD_ROUTING ,PasswordDecoratorsExtendedModule , PasswordValidatorsExtendedModule ,PasswordTemplateDrivenValidationDirectivesExtendedModule, PasswordTemplateDrivenValidationDecoratorsExtendedModule ,PageModule],
  exports: [RouterModule],
    providers:[{ provide: COMPONENT_EXAMPLE, useValue: PASSWORD_COMPONENT_EXAMPLE_CONSTANT }]
  })
export class PasswordModule { }

