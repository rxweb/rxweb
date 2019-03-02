import {Directive, TemplateRef } from "@angular/core";

@Directive({
    selector: '[rxTableDetailTemplate]'
})
export class RxTableDetailTemplateDirective {
    templateRef: TemplateRef<any>;

    constructor(templateRef: TemplateRef<any>) {
        this.templateRef = templateRef;
    };
}