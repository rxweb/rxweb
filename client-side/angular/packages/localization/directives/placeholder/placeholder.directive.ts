import { MultiLingualData } from "../../core/multilingual-data"
import { BaseDirective } from "../base-directive";
import { localizationContainer } from "../../core/localization-container";


export class PlaceholderDirective extends BaseDirective {

    constructor(private element: HTMLInputElement, private name: string, private target: Function) {
        super();
        this.subscribe(this.bind.bind(this));
    }

    bind() {
        var decoratorConfig = localizationContainer.getModelDecorator(this.target, 'multilingual');
        if (decoratorConfig) {
            var componentId = decoratorConfig.config;
            var value = MultiLingualData.get(`${componentId}.${this.name}_p`);
            if (value)
                this.element.placeholder = value;
        }
    }

    destroy() {
        super.destroy();
        this.element = undefined;
    }
}