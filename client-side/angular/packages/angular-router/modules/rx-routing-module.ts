import { NgModule } from "@angular/core";

import { BaseCanActivate } from "../guard/base-can-activate.guard";
import { BaseCanDeactivate } from "../guard/base-can-deactivate.guard";
import { ExtendRouterLinkWithHref } from "../directives/extend-router-link-with-href"
import { ParamResolver } from '../core/param-resolver.service'
import { RxAuthorizeDirective } from "../directives/rx-authorize.directive";
import { RxMultilingualDirective } from "../directives/rx-multilingual.directive";

@NgModule({
    declarations: [ExtendRouterLinkWithHref, RxAuthorizeDirective, RxMultilingualDirective],
    exports: [ExtendRouterLinkWithHref, RxAuthorizeDirective, RxMultilingualDirective],
    providers: [BaseCanActivate, BaseCanDeactivate, ParamResolver]
})
export class RxRoutingModule {

}
