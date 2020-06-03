import { BaseConfigFn } from './base-config-fn';
import { UrlValidationType } from "../../enums/url-validation-type"
export interface UrlConfig extends BaseConfigFn<UrlConfig>{
    urlValidationType?: UrlValidationType
}
