import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { MIN_NUMBER_ROUTING } from "src/app/components/form-validation/validators/minNumber/min-number.routing";
import { MinNumberDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/decorators/minNumber/min-number-decorators-extended.module";
import { MinNumberValidatorsExtendedModule } from "src/assets/examples/reactive-form-validators/validators/minNumber/min-number-validators-extended.module";
import { MinNumberTemplateDrivenExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/minNumber/min-number-template-driven-extended.module";
import { PageModule } from "src/app/components/form-validation/page/page.module";
import { COMPONENT_EXAMPLE } from "src/app/domain/application.const";
import { MIN_NUMBER_COMPONENT_EXAMPLE_CONSTANT } from "src/app/components/form-validation/validators/minNumber/min-number.constants";



@NgModule({
  imports: [MIN_NUMBER_ROUTING, MinNumberDecoratorsExtendedModule, MinNumberValidatorsExtendedModule, MinNumberTemplateDrivenExtendedModule,PageModule],
  exports: [RouterModule],
  providers:[{ provide: COMPONENT_EXAMPLE, useValue: MIN_NUMBER_COMPONENT_EXAMPLE_CONSTANT }]
})
export class MinNumberModule { }

