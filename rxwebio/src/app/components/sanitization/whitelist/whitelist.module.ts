import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { WhitelistDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/decorators/whitelist/whitelist-decorators-extended.module";

import { WHITELIST_COMPONENT_EXAMPLE_CONSTANT } from "src/app/components/sanitization/whitelist/whitelist.constants";
import { COMPONENT_EXAMPLE } from "src/app/domain/application.const";
import { WHITELIST_ROUTING } from "src/app/components/sanitization/whitelist/whitelist.routing";
import { PageModule } from "src/app/components/page/page.module";



@NgModule({
  imports: [WHITELIST_ROUTING ,WhitelistDecoratorsExtendedModule ,PageModule],
  exports: [RouterModule],
    providers:[{ provide: COMPONENT_EXAMPLE, useValue: WHITELIST_COMPONENT_EXAMPLE_CONSTANT }]
  })
export class WhitelistModule { }

