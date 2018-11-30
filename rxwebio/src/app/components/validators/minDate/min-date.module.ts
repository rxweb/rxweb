import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { MIN_DATE_ROUTING } from "src/app/components/form-validation/validators/minDate/min-date.routing";
import { MinDateDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/decorators/minDate/min-date-decorators-extended.module";
import { MinDateValidatorsExtendedModule } from "src/assets/examples/reactive-form-validators/validators/minDate/min-date-validators-extended.module";
import { MinDateTemplateDrivenExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/minDate/min-date-template-driven-extended.module";
import { PageModule } from "src/app/components/form-validation/page/page.module";
import { COMPONENT_EXAMPLE } from "src/app/domain/application.const";
import { MIN_DATE_COMPONENT_EXAMPLE_CONSTANT } from "src/app/components/form-validation/validators/minDate/min-date.constants";



@NgModule({
  imports: [MIN_DATE_ROUTING, MinDateDecoratorsExtendedModule, MinDateValidatorsExtendedModule, MinDateTemplateDrivenExtendedModule,PageModule],
  exports: [RouterModule],
  providers:[{ provide: COMPONENT_EXAMPLE, useValue: MIN_DATE_COMPONENT_EXAMPLE_CONSTANT }]
})
export class MinDateModule { }

