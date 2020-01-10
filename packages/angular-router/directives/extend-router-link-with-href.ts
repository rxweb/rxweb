import { Directive, Input, HostBinding } from "@angular/core";
import { RouterLinkWithHref, Router, ActivatedRoute } from "@angular/router";
import { encoder } from "../core/encoder";
import { routeContainer } from "../core";
import { LocationStrategy } from "@angular/common";

@Directive({ selector: 'a[routerLink],area[routerLink]' })
export class ExtendRouterLinkWithHref extends RouterLinkWithHref {
    isPushed: boolean = false;
    constructor(router: Router, activatedRoute: ActivatedRoute, locationStratergy: LocationStrategy) {
        super(router, activatedRoute, locationStratergy);
        this.overrideProp();
    }

    @Input() params: any[];

    overrideProp() {
        var value = [];
        Object.defineProperty(this, "commands", {
            get: function () {
                var isEncryption = routeContainer.get().urlEncryption;
                if (Array.isArray(value) && Array.isArray(this.params) && !this.isPushed) {
                    this.params.forEach(t => {
                        let encode = isEncryption ? encoder.encode(t) : t;
                        value.push(encode);
                    })
                    this.isPushed = true;
                }
                return value;
            },
            set: function (v) {
                value = v;
            }
        })
    }
}
