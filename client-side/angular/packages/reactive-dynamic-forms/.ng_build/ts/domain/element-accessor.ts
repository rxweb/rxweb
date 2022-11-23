import { DynamicNodeConfig } from "../models/interface/dynamic-node-config";
import { BaseObjectAccessor } from './base-object-accessor';
import { CHECKBOX, SELECT_MULTIPLE, RADIO,RXWEB_ID_STRING } from '../const/app.const'
import { ControlState } from '../statics/control-state';
export abstract class ElementAccessor extends BaseObjectAccessor{
    element: any;

    constructor(dynamicNodeConfig: DynamicNodeConfig) {
        super(dynamicNodeConfig)
    }

    createNodeElement(parentElement: any, name: string) {
        this.element = this.dynamicNodeConfig.renderer.createElement(name);
        this.dynamicNodeConfig.renderer.appendChild(parentElement, this.element);
    }


    removeChildren(element: any) {
        if (element.firstElementChild) {
            this.removeChildren(element.firstElementChild);
        }
        let controlId = element.getAttribute(RXWEB_ID_STRING);
        if (controlId && ControlState.controls[controlId]) {
            ControlState.controls[controlId].destroy();
            delete ControlState.controls[controlId];
        }
    }
   

    setControlConfigValue(targetElement) {
        switch (targetElement.type) {
            case CHECKBOX:
                this.setCheckboxValue(targetElement);
                break;
            case SELECT_MULTIPLE:
                let value = [];
                for (let option of this.element.options)
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

    resetElementValue(value: any) {
        switch (this.element.type) {
            case CHECKBOX:
            case RADIO:
                var elements:any = document.querySelectorAll(`[name='${this.controlConfig.config.name}']`);
                for (var i = 0; i < elements.length; i++) {
                    elements[i].checked = this.element.type == CHECKBOX ? this.checkedCheckbox(value, elements[i]) : this.checkedRadio(value, elements[i]);
                }
                break;
            case SELECT_MULTIPLE:
                for (let option of this.element.options) {
                    option.selected = (value) ? value.filter(t => t == option.value)[0] != undefined : false;
                }
                break;
            default:
                this.element.value = value;
        }
    }

    private checkedCheckbox = (value, element) => (value) ? (this.controlConfig.config.multiselect) ? value.filter(t => element.value == t)[0] != undefined : element.value == value : false;

    private checkedRadio = (value, element) => (value) ? value == element.value : false;

    private setCheckboxValue(targetElement) {
        let value = (this.controlConfig.config.multiselect) ? this.controlConfig.value || [] : targetElement.value;
        if (targetElement.checked)
            (this.controlConfig.config.multiselect) ? value.push(targetElement.value) : null;
        else
            (this.controlConfig.config.multiselect) ? value.splice(value.indexOf(targetElement.value), 1) : value = null;
        this.controlConfig.formControl.setValue(value);
        this.controlConfig.value = value;
    }
}