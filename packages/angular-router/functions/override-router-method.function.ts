import { Router, UrlTree, NavigationExtras} from "@angular/router";
import { encoder } from "../core/encoder";
const BLANK: string = "";
const SLASH: string = '/';
export function overrideRouterMethod() {
    var navigateByUrl = Router.prototype.navigateByUrl;
    Router.prototype.navigateByUrl = function (url: string | UrlTree, extras?: NavigationExtras): Promise<boolean>  {
        if (typeof url === "string") {
            var splitUrl = (<string>url).split(SLASH);
            var encodedText = BLANK;
            splitUrl.forEach(t => {
                encodedText += encodedText === BLANK ? encoder.encode(t) : `${SLASH}${encoder.encode(t)}`;
            })
        }
        return navigateByUrl.call(this,url, extras);
    }
}


