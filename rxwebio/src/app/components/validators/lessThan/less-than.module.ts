import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { LESS_THAN_ROUTING } from "src/app/components/form-validation/validators/lessThan/less-than.routing";
import { LessThanDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/decorators/lessThan/less-than-decorators-extended.module";
import { LessThanValidatorsExtendedModule } from "src/assets/examples/reactive-form-validators/validators/lessThan/less-than-validators-extended.module";
import { LessThanTemplateDrivenExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/lessThan/less-than-template-driven-extended.module";
import { PageModule } from "src/app/components/form-validation/page/page.module";
import { COMPONENT_EXAMPLE } from "src/app/domain/application.const";
import { LESS_THAN_COMPONENT_EXAMPLE_CONSTANT } from "src/app/components/form-validation/validators/lessThan/less-than.constants";



@NgModule({
  imports: [LESS_THAN_ROUTING, LessThanDecoratorsExtendedModule, LessThanValidatorsExtendedModule, LessThanTemplateDrivenExtendedModule,PageModule],
  exports: [RouterModule],
  providers:[{ provide: COMPONENT_EXAMPLE, useValue: LESS_THAN_COMPONENT_EXAMPLE_CONSTANT }]
})
export class LessThanModule { }

