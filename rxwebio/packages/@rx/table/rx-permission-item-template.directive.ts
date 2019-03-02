import { Directive, TemplateRef, Input, ViewContainerRef } from "@angular/core";

@Directive({
    selector: '[rxPermissionItemTemplate]'
})
export class RxPermissionItemTemplateDirective {
    templateRef: TemplateRef<any>;

    @Input('rxPermissionItemTemplate') accessItems: Array<any> = new Array<any>();

    constructor(templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef) {
        this.templateRef = templateRef;
    };

    clear(): void {
        this.viewContainer.clear();
        this.templateRef = undefined;
        this.viewContainer = undefined;
    }
}