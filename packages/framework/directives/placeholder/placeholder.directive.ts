import { MultiLingualData } from "@rxweb/core"
import { BaseDirective } from "../base-directive";


export class PlaceholderDirective extends BaseDirective {

    constructor(private element: HTMLInputElement, private name: string, private componentId: string) {
        super();
        this.element = this.element;
        this.name = this.name;
        this.componentId = this.componentId;
        this.subscribe(this.bind.bind(this));
    }

    bind() {
        var value = MultiLingualData.get(`${this.componentId}.${this.name}_p`);
        if (value)
            this.element.placeholder = value;
    }

    destroy() {
        super.destroy();
        this.element = undefined;
    }
}