import { MultiLingualData } from "@rxweb/core"
import { BaseDirective } from '../base-directive'

export class TextDirective extends BaseDirective {
    private textNodeElement: any;

    constructor(private config: {element:any,name:string,componentId:string,text?:string}) {
        super();
        this.subscribe(this.bind.bind(this));
    }

    bind() {
        var value = MultiLingualData.get(this.config.text ? `${this.config.componentId}.${this.config.text}` : `${this.config.componentId}.${this.config.name}_t`);
        if (value) {
            this.textNodeElement = document.createTextNode(value);
            this.config.element.appendChild(this.textNodeElement);
        }
    }

    destroy() {
        this.config.element.removeChild(this.textNodeElement);
        super.destroy();
    }
}