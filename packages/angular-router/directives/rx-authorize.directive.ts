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

    private _components: any[];

    constructor(private viewContainerRef: ViewContainerRef, private templateRef: TemplateRef<any>, private injector: Injector) {
    }

    @Input('rxAuthorize') set component(value: any) {
        if (Array.isArray(value)) {
            var result = true;
            this._components = value;
            this.checkAuth(0);
        } else if (value)
            this.checkAccess(value);
    }

    checkAuth(index) {
        if (this._components.length > index) {
            this.checkAccess(this._components[index], index);
        } else {
            this.updateView(true)
        }
    }

    checkAccess(value:any,currentIndex:number = 0) {
        var authorizeModel = routeContainer.get().authorization;
        let component = routeContainer.getModelDecorator(value as Function, "access");
        if (authorizeModel && component) {
            var authorize = this.injector.get(authorizeModel) as IAuthorize;
            var authorizeConfig = componentInstanceProvider.getAuthorizeConfig();
            var result = authorize.authorizeChildren(component.functions, authorizeConfig) as Promise<boolean> | boolean;
                if (typeof result === "boolean") {
                    if (this._components && this._components.length > 0 && result) {
                        let index = currentIndex + 1;
                        this.checkAuth(index);
                    }
                    else 
                        this.updateView(result);
                } else
                    result.then(t => {
                        if (t) {
                            let index = currentIndex + 1;
                            this.checkAuth(index);
                        }else
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