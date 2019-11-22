import { Directive, AfterViewInit, ElementRef, Renderer, Input, OnDestroy, ViewContainerRef, TemplateRef, EmbeddedViewRef } from "@angular/core";
import { MultiLingualData } from "@rxweb/core";
import { BaseDirective } from "./base.directive";
import { NgIfContext } from "@angular/common";

@Directive({
    selector: 'rxRender',
})
export class RxRenderDirective {
    @Input('rxRender') render(value: boolean) {
        this.updateView(value);
    };

    private context: NgIfContext = new NgIfContext();
    private viewRef: EmbeddedViewRef<NgIfContext> | null = null;


    constructor(private viewContainer: ViewContainerRef, private templateRef: TemplateRef<NgIfContext>) { }

    private updateView(value: boolean) {
        if (value) {
            if (!this.viewRef) {
                this.viewContainer.clear();
                if (this.templateRef) 
                    this.viewRef = this.viewContainer.createEmbeddedView(this.templateRef, this.context);
            }
        } else {
            this.viewContainer.clear();
            this.viewRef = null;
        }
    }
}
