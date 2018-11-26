import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { ODD_ROUTING } from "src/app/components/form-validation/validators/odd/odd.routing";
import { OddDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/decorators/odd/odd-decorators-extended.module";
import { OddValidatorsExtendedModule } from "src/assets/examples/reactive-form-validators/validators/odd/odd-validators-extended.module";
import { OddTemplateDrivenExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/odd/odd-template-driven-extended.module";
import { PageModule } from "src/app/components/form-validation/page/page.module";
import { COMPONENT_EXAMPLE } from "src/app/domain/application.const";
import { ODD_COMPONENT_EXAMPLE_CONSTANT } from "src/app/components/form-validation/validators/odd/odd.constants";



@NgModule({
  imports: [ODD_ROUTING, OddDecoratorsExtendedModule, OddValidatorsExtendedModule, OddTemplateDrivenExtendedModule,PageModule],
  exports: [RouterModule],
  providers:[{ provide: COMPONENT_EXAMPLE, useValue: ODD_COMPONENT_EXAMPLE_CONSTANT }]
})
export class OddModule { }

