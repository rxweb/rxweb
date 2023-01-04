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
            var result =null;// childMultilingual.resolveChildren(this.viewContainerRef["_view"].component.constructor);
            const viewContainer:any = this.viewContainerRef;
            if (viewContainer["_view"] && viewContainer["_view"].component != null)
                result = childMultilingual.resolveChildren(viewContainer["_view"].component.constructor);
            else {
                var component = viewContainer._hostLView[0].__ngContext__[viewContainer._hostLView[0].__ngContext__.length - 1];
                result = childMultilingual.resolveChildren(component.constructor);
            }
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