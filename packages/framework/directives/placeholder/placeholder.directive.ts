import { TemplateConfig } from '@rxweb/dom'
import { ElementBinder } from '../../interface/element-binder'
import { MultiLingualData } from "@rxweb/core"


export class PlaceholderDirective implements ElementBinder {
    private element: HTMLInputElement;
    private name: string;
    private componentId: string;
    constructor(config: any) {
        this.element = config.element;
        this.name = config.propName;
        this.componentId = config.componentId;
    }

    getTemplate(): TemplateConfig {
        return null;
    }

    bind() {
        var value = MultiLingualData.get(`${this.componentId}.${this.name}_p`);
        if (value)
            this.element.placeholder = value;
    }

    valueChange(value: any) {
        if (value)
            this.bind();
    }

    destroy() {

    }
}