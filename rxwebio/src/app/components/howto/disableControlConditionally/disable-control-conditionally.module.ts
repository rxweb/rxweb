import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { DISABLE_CONTROL_CONDITIONALLY_COMPONENT_EXAMPLE_CONSTANT } from "src/app/components/howto/disableControlConditionally/disable-control-conditionally.constants";
import { COMPONENT_EXAMPLE } from "src/app/domain/application.const";
import { DISABLE_CONTROL_CONDITIONALLY_ROUTING } from "src/app/components/howto/disableControlConditionally/disable-control-conditionally.routing";
import { PageModule } from "src/app/components/page/page.module";



@NgModule({
  imports: [DISABLE_CONTROL_CONDITIONALLY_ROUTING ,PageModule],
  exports: [RouterModule],
    providers:[{ provide: COMPONENT_EXAMPLE, useValue: DISABLE_CONTROL_CONDITIONALLY_COMPONENT_EXAMPLE_CONSTANT }]
  })
export class DisableControlConditionallyModule { }

