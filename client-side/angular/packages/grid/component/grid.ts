import { GridDesigner } from "../domain/grid-designer";

export class GridElement extends HTMLElement  {

    

    constructor() {
        super();
    }

    _design: GridDesigner;

    set design(value: GridDesigner) {
        if (value)
            value.design(this);
        this._design = value;
    }

    get design() {
        return this._design;
    }


}

customElements.define('rx-grid', GridElement);