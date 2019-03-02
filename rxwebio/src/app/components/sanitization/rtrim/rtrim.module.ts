import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { RtrimDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/decorators/rtrim/rtrim-decorators-extended.module";

import { RTRIM_COMPONENT_EXAMPLE_CONSTANT } from "src/app/components/sanitization/rtrim/rtrim.constants";
import { COMPONENT_EXAMPLE } from "src/app/domain/application.const";
import { RTRIM_ROUTING } from "src/app/components/sanitization/rtrim/rtrim.routing";
import { PageModule } from "src/app/components/page/page.module";



@NgModule({
  imports: [RTRIM_ROUTING ,RtrimDecoratorsExtendedModule ,PageModule],
  exports: [RouterModule],
    providers:[{ provide: COMPONENT_EXAMPLE, useValue: RTRIM_COMPONENT_EXAMPLE_CONSTANT }]
  })
export class RtrimModule { }

