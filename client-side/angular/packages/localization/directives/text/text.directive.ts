import { MultiLingualData } from "../../core/multilingual-data"
import { BaseDirective } from '../base-directive'
import { localizationContainer } from "../../core/localization-container";

export class TextDirective extends BaseDirective {
    private textNodeElement: any;

    constructor(private config: {element:any,name:string,target:Function,text?:string}) {
        super();
        this.subscribe(this.bind.bind(this));
    }

    bind() {
        var decoratorConfig:any = localizationContainer.getModelDecorator(this.config.target ?? this.config.element.componentName, 'multilingual');
        if (typeof this.config.target == "string") 
            decoratorConfig = { config: this.config.target };
        if (decoratorConfig == undefined)
            decoratorConfig = { config: this.config.element.getAttribute("component-id") };

        if (decoratorConfig) {
            var componentId = decoratorConfig.config;
            var value = MultiLingualData.get(this.config.text &&  this.config.text.indexOf("_") != -1 ? `${componentId}.${this.config.text}` : `${componentId}.${this.config.name}_t`);
            if (value) {
                this.textNodeElement = document.createTextNode(value);
                this.config.element.appendChild(this.textNodeElement);
            }
        }
    }

    destroy() {
        if (this.textNodeElement) {
            this.config.element.removeChild(this.textNodeElement);
        }
        super.destroy();
    }
}