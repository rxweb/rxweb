import {OnDestroy,Input,ViewContainerRef,TemplateRef,Directive } from "@angular/core"

@Directive({
    selector: '[portalHost]'
})
export class PortalHostDirective implements OnDestroy {
    constructor(public viewContainerRef: ViewContainerRef) { }
    @Input('portalHost') set portal(value: TemplateRef<any>) {
        this.viewContainerRef.createEmbeddedView(value);
    }

    ngOnDestroy() {
        this.viewContainerRef.clear();
    }
}