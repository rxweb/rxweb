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
    private failedCount = 0;
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
    private failedGoToNext(currentIndex) {
        if (this._components.length == this.failedCount)
            this.updateView(false);
        else {
            this.goToNext(currentIndex)
        }
    }
    private goToNext(currentIndex) {
        let index = currentIndex + 1;
        this.checkAuth(index);
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
                        this.goToNext(currentIndex);
                    } else if (this._components && this._components.length > 1 && !result)
                    {
                        this.failedCount++;
                        this.failedGoToNext(currentIndex)
                    }
                    else 
                        this.updateView(result);
                } else
                    result.then(t => {
                        if (t) {
                            let index = currentIndex + 1;
                            this.checkAuth(index);
                        } else if (this._components && this._components.length > 1 && !t) {
                            this.failedCount++;
                            this.failedGoToNext(currentIndex)
                        } else
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