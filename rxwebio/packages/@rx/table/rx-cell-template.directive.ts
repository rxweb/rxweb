import {Directive,TemplateRef } from "@angular/core";

@Directive({
    selector: '[rxCellTemplate]'
})
export class RxCellTemplateDirective {
    templateRef: TemplateRef<any>;

    constructor(templateRef: TemplateRef<any>) {
        this.templateRef = templateRef;
    };
}