import { NgModule } from "@angular/core";

import { BaseCanActivate } from "../guard/base-can-activate.guard";
import { BaseCanDeactivate } from "../guard/base-can-deactivate.guard";
import { ExtendRouterLinkWithHref } from "../directives/extend-router-link-with-href"
import { ParamResolver } from '../core/param-resolver.service'
import { RxAuthorizeDirective } from "../directives/rx-authorize.directive";

@NgModule({
    declarations: [ExtendRouterLinkWithHref, RxAuthorizeDirective],
    exports: [ExtendRouterLinkWithHref, RxAuthorizeDirective],
    providers: [BaseCanActivate, BaseCanDeactivate, ParamResolver]
})
export class RxRoutingModule {

}
