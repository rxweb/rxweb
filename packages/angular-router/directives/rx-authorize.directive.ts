import { Injector, Directive, Type, EmbeddedViewRef, ViewContainerRef, TemplateRef, Input } from "@angular/core";
import { NgIfContext } from "@angular/common";
import { routeContainer } from "../core";
import { IAuthorize } from '../interfaces/i-authorize'
import { componentInstanceProvider } from "../core/component-instance-provider";
@Directive({
    selector: '[rxAuthorize]'
})
export class RxAuthorizeDirective {
    private viewRef: EmbeddedViewRef<any> | null = null;
    private _context: NgIfContext = new NgIfContext();

    constructor(private viewContainerRef: ViewContainerRef, private templateRef: TemplateRef<any>, private injector: Injector) {
        console.log(this.templateRef)
    }

    @Input('rxAuthorize') set component(value: any) {
        if (value) {
            var authorizeModel = routeContainer.get().authorization;
            let component = routeContainer.getModelDecorator(value as Function, "access");
            if (authorizeModel && component) {
                var authorize = this.injector.get(authorizeModel) as IAuthorize;
                var authorizeConfig = componentInstanceProvider.getAuthorizeConfig();
                var result = authorize.authorizeChildren(component.functions, authorizeConfig) as boolean;
                this.updateView(result);
            }
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