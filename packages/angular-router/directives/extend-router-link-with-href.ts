import { Directive, Input, HostBinding } from "@angular/core";
import { RouterLinkWithHref } from "@angular/router";
import { encoder } from "../core/encoder";
import { routeContainer } from "../core";

@Directive({ selector: 'a[routerLink],area[routerLink]' })
export class ExtendRouterLinkWithHref extends RouterLinkWithHref {
    private newCommands: any[] = [];
    @Input()
    set routerLink(commands: any[] | string) {
        var isEncryption = routeContainer.get().urlEncryption;
        if (commands != null && isEncryption) {
            commands = Array.isArray(commands) ? commands : [commands];
            commands.forEach(t => {
                let startsWithSlash = String(t).charAt(0) == '/';
                if (startsWithSlash)
                    t = t.replace('/','');
                let encode = encoder.encode(t);
                this.newCommands.push(startsWithSlash ? `/${encode}` : encode);
            });
            this["commands"] = this.newCommands;
        } else {
            this["commands"] = commands;
        }
    }
}
