import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { EVEN_ROUTING } from "src/app/components/form-validation/validators/even/even.routing";
import { EvenDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/decorators/even/even-decorators-extended.module";
import { EvenValidatorsExtendedModule } from "src/assets/examples/reactive-form-validators/validators/even/even-validators-extended.module";
import { EvenTemplateDrivenExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/even/even-template-driven-extended.module";
import { PageModule } from "src/app/components/form-validation/page/page.module";
import { COMPONENT_EXAMPLE } from "src/app/domain/application.const";
import { EVEN_COMPONENT_EXAMPLE_CONSTANT } from "src/app/components/form-validation/validators/even/even.constants";



@NgModule({
  imports: [EVEN_ROUTING, EvenDecoratorsExtendedModule, EvenValidatorsExtendedModule, EvenTemplateDrivenExtendedModule,PageModule],
  exports: [RouterModule],
  providers:[{ provide: COMPONENT_EXAMPLE, useValue: EVEN_COMPONENT_EXAMPLE_CONSTANT }]
})
export class EvenModule { }

