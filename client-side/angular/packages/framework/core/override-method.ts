import { APP_DIRECTIVES } from "../const/app-directives.const";
import { directiveElement } from "./directive-elements";

export function overrideAttribute() {
    var setAttribute = HTMLElement.prototype.setAttribute

    function overrideSetAttribute(qualifiedName: string, value: string) {
        if (qualifiedName == "component-id") {
            APP_DIRECTIVES.forEach(t => {
                var element: HTMLElement = this;
                var item = element.attributes.getNamedItem(t);
                if (item) {
                    directiveElement.addElementConfig(value, t, { element: this, propName: item.value })
                }
            });
        }
        setAttribute.call(this, qualifiedName, value);
    }
    HTMLElement.prototype.setAttribute = overrideSetAttribute;
}

