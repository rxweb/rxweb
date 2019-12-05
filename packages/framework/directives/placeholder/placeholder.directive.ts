import { MultiLingualData } from "@rxweb/core"
import { BaseDirective } from "../base-directive";
import { getAttributeValue } from "../../functions/get-attribute-value";


export class PlaceholderDirective extends BaseDirective {

    constructor(private element: HTMLInputElement, private name: string, private componentId: string) {
        super();
        this.subscribe(this.bind.bind(this));
    }

    bind() {
        var componentId = this.componentId || getAttributeValue(this.element, "component-id");
        var value = MultiLingualData.get(`${componentId}.${this.name}_p`);
        if (value)
            this.element.placeholder = value;
    }

    destroy() {
        super.destroy();
        this.element = undefined;
    }
}