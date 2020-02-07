import { Injector, Directive,  EmbeddedViewRef, ViewContainerRef, TemplateRef, Input } from "@angular/core";
import { NgIfContext } from "@angular/common";
import { routeContainer } from "../core";
import { IMultilingual } from "../interfaces/i-multilingual";
@Directive({
    selector: '[rxMultilingual]'
})
export class RxMultilingualDirective {
    private viewRef: EmbeddedViewRef<any> | null = null;
    private _context: NgIfContext = new NgIfContext();

    constructor(private viewContainerRef: ViewContainerRef, private templateRef: TemplateRef<any>, private injector: Injector) {}

    @Input('rxMultilingual') set component(value: any) {
        let childMultiLingual = routeContainer.get().childMultilingualResolver
        if (childMultiLingual) {
            var childMultilingual = this.injector.get(childMultiLingual) as IMultilingual;
            var result = childMultilingual.resolveChildren(this.viewContainerRef["_view"].component.constructor);
            if(typeof result == "boolean")
                this.updateView(result);
            else
                result.then(t => {
                    this.updateView(t);
                })
        }
    }

    private updateView(value: boolean) {
        if (this.viewRef) {
            this.viewContainerRef.clear();
            this.viewRef = null;
        }
        if (value)
            this.viewRef = this.viewContainerRef.createEmbeddedView(this.templateRef, this._context);
        else
            this.viewContainerRef.clear();
    }
}