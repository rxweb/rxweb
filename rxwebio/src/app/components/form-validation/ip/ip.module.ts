import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';

import { IpValidatorsExtendedModule } from "src/assets/examples/reactive-form-validators/validators/ip/ip-validators-extended.module";
import { IP_COMPONENT_EXAMPLE_CONSTANT } from "src/app/components/form-validation/ip/ip.constants";
import { COMPONENT_EXAMPLE } from "src/app/domain/application.const";
import { IP_ROUTING } from "src/app/components/form-validation/ip/ip.routing";
import { PageModule } from "src/app/components/page/page.module";



@NgModule({
  imports: [IP_ROUTING ,IpValidatorsExtendedModule,PageModule],
  exports: [RouterModule],
    providers:[{ provide: COMPONENT_EXAMPLE, useValue: IP_COMPONENT_EXAMPLE_CONSTANT }]
  })
export class IpModule { }

