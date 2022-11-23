import { BaseObjectAccessor } from './base-object-accessor';
import { CHECKBOX, SELECT_MULTIPLE, RADIO, RXWEB_ID_STRING } from '../const/app.const';
import { ControlState } from '../statics/control-state';
/**
 * @abstract
 */
export class ElementAccessor extends BaseObjectAccessor {
    /**
     * @param {?} dynamicNodeConfig
     */
    constructor(dynamicNodeConfig) {
        super(dynamicNodeConfig);
        this.checkedCheckbox = (value, element) => (value) ? (this.controlConfig.config.multiselect) ? value.filter(t => element.value == t)[0] != undefined : element.value == value : false;
        this.checkedRadio = (value, element) => (value) ? value == element.value : false;
    }
    /**
     * @param {?} parentElement
     * @param {?} name
     * @return {?}
     */
    createNodeElement(parentElement, name) {
        this.element = this.dynamicNodeConfig.renderer.createElement(name);
        this.dynamicNodeConfig.renderer.appendChild(parentElement, this.element);
    }
    /**
     * @param {?} element
     * @return {?}
     */
    removeChildren(element) {
        if (element.firstElementChild) {
            this.removeChildren(element.firstElementChild);
        }
        let /** @type {?} */ controlId = element.getAttribute(RXWEB_ID_STRING);
        if (controlId && ControlState.controls[controlId]) {
            ControlState.controls[controlId].destroy();
            delete ControlState.controls[controlId];
        }
    }
    /**
     * @param {?} targetElement
     * @return {?}
     */
    setControlConfigValue(targetElement) {
        switch (targetElement.type) {
            case CHECKBOX:
                this.setCheckboxValue(targetElement);
                break;
            case SELECT_MULTIPLE:
                let /** @type {?} */ value = [];
                for (let /** @type {?} */ option of this.element.options)
                    if (option.selected && option.value)
                        value.push(option.value);
                this.controlConfig.value = value;
                break;
            default:
                this.controlConfig.formControl.setValue(targetElement.value);
                this.controlConfig.value = targetElement.value;
                break;
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    resetElementValue(value) {
        switch (this.element.type) {
            case CHECKBOX:
            case RADIO:
                var /** @type {?} */ elements = document.querySelectorAll(`[name='${this.controlConfig.config.name}']`);
                for (var /** @type {?} */ i = 0; i < elements.length; i++) {
                    elements[i].checked = this.element.type == CHECKBOX ? this.checkedCheckbox(value, elements[i]) : this.checkedRadio(value, elements[i]);
                }
                break;
            case SELECT_MULTIPLE:
                for (let /** @type {?} */ option of this.element.options) {
                    option.selected = (value) ? value.filter(t => t == option.value)[0] != undefined : false;
                }
                break;
            default:
                this.element.value = value;
        }
    }
    /**
     * @param {?} targetElement
     * @return {?}
     */
    setCheckboxValue(targetElement) {
        let /** @type {?} */ value = (this.controlConfig.config.multiselect) ? this.controlConfig.value || [] : targetElement.value;
        if (targetElement.checked)
            (this.controlConfig.config.multiselect) ? value.push(targetElement.value) : null;
        else
            (this.controlConfig.config.multiselect) ? value.splice(value.indexOf(targetElement.value), 1) : value = null;
        this.controlConfig.formControl.setValue(value);
        this.controlConfig.value = value;
    }
}
function ElementAccessor_tsickle_Closure_declarations() {
    /** @type {?} */
    ElementAccessor.prototype.element;
    /** @type {?} */
    ElementAccessor.prototype.checkedCheckbox;
    /** @type {?} */
    ElementAccessor.prototype.checkedRadio;
}
//# sourceMappingURL=element-accessor.js.map