import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { TIME_ROUTING } from "src/app/components/form-validation/validators/time/time.routing";
import { TimeDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/decorators/time/time-decorators-extended.module";
import { TimeValidatorsExtendedModule } from "src/assets/examples/reactive-form-validators/validators/time/time-validators-extended.module";
import { TimeTemplateDrivenExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/time/time-template-driven-extended.module";
import { PageModule } from "src/app/components/form-validation/page/page.module";
import { COMPONENT_EXAMPLE } from "src/app/domain/application.const";
import { TIME_COMPONENT_EXAMPLE_CONSTANT } from "src/app/components/form-validation/validators/time/time.constants";



@NgModule({
  imports: [TIME_ROUTING, TimeDecoratorsExtendedModule, TimeValidatorsExtendedModule, TimeTemplateDrivenExtendedModule,PageModule],
  exports: [RouterModule],
  providers:[{ provide: COMPONENT_EXAMPLE, useValue: TIME_COMPONENT_EXAMPLE_CONSTANT }]
})
export class TimeModule { }

