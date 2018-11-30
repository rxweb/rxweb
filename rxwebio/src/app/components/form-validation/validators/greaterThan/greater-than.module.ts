import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { GREATER_THAN_ROUTING } from "src/app/components/form-validation/validators/greaterThan/greater-than.routing";
import { GreaterThanDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/decorators/greaterThan/greater-than-decorators-extended.module";
import { GreaterThanValidatorsExtendedModule } from "src/assets/examples/reactive-form-validators/validators/greaterThan/greater-than-validators-extended.module";
import { GreaterThanTemplateDrivenExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/greaterThan/greater-than-template-driven-extended.module";
import { PageModule } from "src/app/components/form-validation/page/page.module";
import { COMPONENT_EXAMPLE } from "src/app/domain/application.const";
import { GREATER_THAN_COMPONENT_EXAMPLE_CONSTANT } from "src/app/components/form-validation/validators/greaterThan/greater-than.constants";



@NgModule({
  imports: [GREATER_THAN_ROUTING, GreaterThanDecoratorsExtendedModule, GreaterThanValidatorsExtendedModule, GreaterThanTemplateDrivenExtendedModule,PageModule],
  exports: [RouterModule],
  providers:[{ provide: COMPONENT_EXAMPLE, useValue: GREATER_THAN_COMPONENT_EXAMPLE_CONSTANT }]
})
export class GreaterThanModule { }

