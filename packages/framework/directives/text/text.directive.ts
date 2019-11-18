import { TemplateConfig} from '@rxweb/dom'
import { ElementBinder } from '../../interface/element-binder'
import { MultiLingualData } from "@rxweb/core"


export class TextDirective implements ElementBinder {
    private element: HTMLInputElement;
    private name: string;
    private componentId: string;
    private textNodeElement: any;
    constructor(config:any) {
        this.element = config.element;
        this.name = config.propName;
        this.componentId = config.componentId;
    }

    getTemplate(): TemplateConfig {
        return null;        
    }

    bind() {
        var value = MultiLingualData.get(`${this.componentId}.${this.name}_t`);
        if (value) {
            this.textNodeElement = document.createTextNode(value);
            this.element.appendChild(this.textNodeElement);
        }
    }

    valueChange(value: any) {
        if (value)
            this.bind();
    }

    destroy() {
        
    }
}