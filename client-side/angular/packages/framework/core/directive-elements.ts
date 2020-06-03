import { DecoratorConfig, ComponentPropConfig, PropertyInfo } from "../interface/component-prop-config";
import { DirectiveElementConfig, ComponentDirectiveElement } from "../interface/directive-element-config";

export const directiveElement:
    {
        get(componentId: string): ComponentDirectiveElement
        addElementConfig(componentId: string, directiveName: string, directiveElementConfig: DirectiveElementConfig): void,
    } = new (class {
        private componentDirectiveElements: ComponentDirectiveElement[] = [];

        get(componentId: string): ComponentDirectiveElement{
            return this.componentDirectiveElements.filter(t => t.componentId == componentId)[0];
        }

        addElementConfig(componentId: string, directiveName: string, directiveElementConfig: DirectiveElementConfig) {
            var directiveElement = this.componentDirectiveElements.filter(t => t.componentId == componentId)[0];
            if (!directiveElement) {
                directiveElement = {
                    componentId: componentId, directives: {}
                }
            }
            if (!directiveElement.directives[directiveName])
                directiveElement.directives[directiveName] = new Array<DirectiveElementConfig>();
            directiveElement.directives[directiveName].push(directiveElementConfig);
            this.componentDirectiveElements.push(directiveElement);
        }
    })();
