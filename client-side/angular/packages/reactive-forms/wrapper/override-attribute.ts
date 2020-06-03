import { formGroupContainer } from "../core/form-group.state";
const FORM_GROUP_PATH = "form-group-path";
function overrideAttribute() {
    var setAttribute = HTMLElement.prototype.setAttribute
    HTMLElement.prototype.setAttribute = function (qualifiedName: string, value: string) {
        if (qualifiedName == FORM_GROUP_PATH) {
            formGroupContainer.mapElement(value, this);
        }
        setAttribute.call(this, qualifiedName, value);
    };
}

export function bootstrapForms() {
    overrideAttribute();
}