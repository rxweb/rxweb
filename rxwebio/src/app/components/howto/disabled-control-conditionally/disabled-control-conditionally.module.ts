import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { Disabled_control_conditionallyDecoratorsExtendedModule } from "src/assets/examples/howto/decorators/disabled-control-conditionally/disabled-control-conditionally-decorators-extended.module";
import { DISABLED_CONTROL_CONDITIONALLY_COMPONENT_EXAMPLE_CONSTANT } from "src/app/components/howto/disabled-control-conditionally/disabled-control-conditionally.constants";
import { COMPONENT_EXAMPLE } from "src/app/domain/application.const";
import { DISABLED_CONTROL_CONDITIONALLY_ROUTING } from "src/app/components/howto/disabled-control-conditionally/disabled-control-conditionally.routing";
import { PageModule } from "src/app/components/page/page.module";



@NgModule({
  imports: [DISABLED_CONTROL_CONDITIONALLY_ROUTING ,Disabled_control_conditionallyDecoratorsExtendedModule ,PageModule],
  exports: [RouterModule],
    providers:[{ provide: COMPONENT_EXAMPLE, useValue: DISABLED_CONTROL_CONDITIONALLY_COMPONENT_EXAMPLE_CONSTANT }]
  })
export class Disabled_control_conditionallyModule { }

