import { Component, ElementRef, Input } from "@angular/core"
import { GridDesigner } from "../domain/grid-designer";
@Component({
    selector: 'rx-grid',
    template: ''
})
export class GridElement {

    private element: HTMLDivElement;

    constructor(elementRef: ElementRef) {
        this.element = elementRef.nativeElement;
    }

    _design: GridDesigner;

    @Input() set design(value: GridDesigner) {
        if (value)
            value.design(this.element);
        this._design = value;
    }

    get design() {
        return this._design;
    }

    ngOnDestroy() {
        if (this._design !== undefined && this._design.destroy)
            this._design.destroy();
    }
}

//customElements.define('rx-grid', GridElement);