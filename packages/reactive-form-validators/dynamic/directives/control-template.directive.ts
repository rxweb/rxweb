import { Directive, TemplateRef, Input} from "@angular/core";

@Directive({
    selector: '[controlTemplate]'
})
export class ControlTemplateDirective {
    templateRef: TemplateRef<any>;

    @Input('controlTemplate') type: string;

    constructor(templateRef: TemplateRef<any>) {
        this.templateRef = templateRef;
    };
}