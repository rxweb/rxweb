import {Directive,TemplateRef,Input } from "@angular/core";

@Directive({
    selector: '[htmlControlTemplate]'
})
export class HtmlControlTemplateDirective {
    templateRef: TemplateRef<any>;

    @Input('htmlControlTemplate') type:string;

    constructor(templateRef: TemplateRef<any>) {
        this.templateRef = templateRef;
    };
}
