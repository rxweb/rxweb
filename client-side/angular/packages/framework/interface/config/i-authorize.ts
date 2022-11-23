import { AuthorizeConfig } from "./authorize-config";

export interface IAuthorize{
    isAuthorize(config: AuthorizeConfig) : boolean | Promise<boolean>
}