import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { DecoratorsExtendedModule } from "src/assets/examples/decorators/decorators-extended.module";
import { DISABLED_CONTROL_CONDITIONALLY_COMPONENT_EXAMPLE_CONSTANT } from "src/app/components/decorators/disabledControlConditionally/disabled-control-conditionally.constants";
import { COMPONENT_EXAMPLE } from "src/app/domain/application.const";
import { DISABLED_CONTROL_CONDITIONALLY_ROUTING } from "src/app/components/decorators/disabledControlConditionally/disabled-control-conditionally.routing";
import { PageModule } from "src/app/components/page/page.module";



@NgModule({
  imports: [DISABLED_CONTROL_CONDITIONALLY_ROUTING ,DecoratorsExtendedModule,PageModule],
  exports: [RouterModule],
    providers:[{ provide: COMPONENT_EXAMPLE, useValue: DISABLED_CONTROL_CONDITIONALLY_COMPONENT_EXAMPLE_CONSTANT }]
  })
export class DisabledControlConditionallyModule { }

