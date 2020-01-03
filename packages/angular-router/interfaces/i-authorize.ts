import { ActivatedRouteSnapshot } from "@angular/router";
import { AuthorizeConfig } from "./authorize-config";

export interface IAuthorize {
    authorize(authorizeConfig: AuthorizeConfig, route: ActivatedRouteSnapshot): Promise<boolean> | boolean;
    authorizeChildren(authorizeConfig: AuthorizeConfig, pageAuthorizeConfig: AuthorizeConfig): Promise<boolean> | boolean;
}
