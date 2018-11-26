import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { EMAIL_ROUTING } from "src/app/components/form-validation/validators/email/email.routing";
import { EmailDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/decorators/email/email-decorators-extended.module";
import { EmailValidatorsExtendedModule } from "src/assets/examples/reactive-form-validators/validators/email/email-validators-extended.module";
import { EmailTemplateDrivenExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/email/email-template-driven-extended.module";
import { PageModule } from "src/app/components/form-validation/page/page.module";
import { COMPONENT_EXAMPLE } from "src/app/domain/application.const";
import { EMAIL_COMPONENT_EXAMPLE_CONSTANT } from "src/app/components/form-validation/validators/email/email.constants";



@NgModule({
  imports: [EMAIL_ROUTING, EmailDecoratorsExtendedModule, EmailValidatorsExtendedModule, EmailTemplateDrivenExtendedModule,PageModule],
  exports: [RouterModule],
  providers:[{ provide: COMPONENT_EXAMPLE, useValue: EMAIL_COMPONENT_EXAMPLE_CONSTANT }]
})
export class EmailModule { }

