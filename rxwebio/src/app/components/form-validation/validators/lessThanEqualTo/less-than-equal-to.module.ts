import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { LESS_THAN_EQUAL_TO_ROUTING } from "src/app/components/form-validation/validators/lessThanEqualTo/less-than-equal-to.routing";
import { LessThanEqualToDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/decorators/lessThanEqualTo/less-than-equal-to-decorators-extended.module";
import { LessThanEqualToValidatorsExtendedModule } from "src/assets/examples/reactive-form-validators/validators/lessThanEqualTo/less-than-equal-to-validators-extended.module";
import { LessThanEqualToTemplateDrivenExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/lessThanEqualTo/less-than-equal-to-template-driven-extended.module";
import { PageModule } from "src/app/components/form-validation/page/page.module";
import { COMPONENT_EXAMPLE } from "src/app/domain/application.const";
import { LESS_THAN_EQUAL_TO_COMPONENT_EXAMPLE_CONSTANT } from "src/app/components/form-validation/validators/lessThanEqualTo/less-than-equal-to.constants";



@NgModule({
  imports: [LESS_THAN_EQUAL_TO_ROUTING, LessThanEqualToDecoratorsExtendedModule, LessThanEqualToValidatorsExtendedModule, LessThanEqualToTemplateDrivenExtendedModule,PageModule],
  exports: [RouterModule],
  providers:[{ provide: COMPONENT_EXAMPLE, useValue: LESS_THAN_EQUAL_TO_COMPONENT_EXAMPLE_CONSTANT }]
})
export class LessThanEqualToModule { }

