import { ControlState } from '../static/control-state'
import { Item } from './item';
import { FunctionParser } from '../static/function-parser';
export class DomManipulation {
    private itemObject: Item;
    private subscribeProps: string[] = [];
    private updating: boolean = false;

    element: any;
    controlId: any;

    constructor(parentNode: any, private elementName: string, private config, private modelObject: { [key: string]: any }, index: number, private additionalConfiguration: { [key: string]: any } = null) {

        if (modelObject instanceof Item) {
            this.itemObject = modelObject;
            this.modelObject = this.itemObject.value;
        }
        this.createNodeElement(parentNode);
        if (config.id) {
            this.controlId = `${config.id}-${index}`;
        } else {
            this.controlId = ControlState.controlId = ControlState.controlId + 1;
        }
        this.addAttributes({ "data-rxwebid": this.controlId });
    }

    private createNodeElement(parentNode: any) {
        if (this.elementName === "text") {
            var value = this.getValue(this.config.text);
            if (value === undefined || value === "undefined")
                value = "";
            this.element = document.createTextNode(value);
        }
        else
            this.element = document.createElement(this.elementName);
        parentNode.appendChild(this.element);
    }

    bind() {
        if (typeof this.config === "object" && this.element) {
            Object.keys(this.config).forEach(key => {
                if (this.config[key])
                switch (key) {
                    case 'attributes':
                        this.addAttributes(this.config[key]);
                        break;
                    case 'class':
                        this.addOrRemoveClass(this.config[key]);
                        break;
                    case 'style':
                        this.addStyle(this.config[key]);
                        break;
                    case 'event':
                        this.setEvent(this.config[key]);
                        break;
                }
            });
        }
        if (this.itemObject && !this.updating) {
            this.itemObject.subscribe(this.subscribeProps, this.updateElement.bind(this));
            this.subscribeProps = [];
        }
    }

    updateElement() {
        this.updating = true;
        if (this.elementName === "text") {
            var value = this.getValue(this.config.text);
            if (value === undefined || value === "undefined")
                value = "";
            this.element.nodeValue = value;
        }
        this.bind();
        this.updating = false;
    }

    setEvent(event: { [key: string]: Function }) {
        Object.keys(event).forEach(t => {
            if (typeof event[t] === "string") {
                this.element[t] = (e) => {
                    var eventName: any = event[t];
                    if (this.additionalConfiguration && this.additionalConfiguration.actions && this.additionalConfiguration.actions[eventName]) {
                        let actionMethod = this.additionalConfiguration.actions[eventName];
                        actionMethod.call(this.modelObject.instance, this.modelObject)
                    }
                }
            }
            else
                this.element[t] = event[t];
        })
    }

    addAttributes(attributes: { [key: string]: any }) {
        Object.keys(attributes).forEach(attribute => {
            var table = this.element as HTMLTableElement;
            if (this.element.setAttribute)
                this.element.setAttribute(attribute, attributes[attribute]);
        })
    }

    addStyle(style: { [key: string]: any }) {
        var cssText = '';
        Object.keys(style).forEach(t => { cssText+= `${t}:${style[t]};` })
        this.element.style.cssText = cssText;
    }

    addOrRemoveClass(classNames: any[], isAdd: boolean = true) {
        classNames = this.getClassNames(classNames);
        if (this.updating) {
            for (var i = 0, j = this.element.classList.length; i < j; i++) {
                var className = this.element.classList[i];
                var classIndex = classNames.indexOf(className);
                if (classIndex == -1)
                    this.element.classList.remove(className);
                else
                    classNames.splice(0, classIndex);
            }
        }
        classNames.forEach(t => {
            this.element.classList.add(t);
        })
    }

    private getClassNames(classes: any[]) {
        let elementClasses = [];
        if (classes)
            classes.forEach(t => {
                if (typeof t == "string")
                    elementClasses.push(t);
                else if (typeof t == "function") {
                    this.propSubscribes(t);
                    let elementClass = t.call(this.modelObject, this.config.parameterConfig);
                    if (elementClass && !Array.isArray(elementClass))
                        elementClasses.push(elementClass)
                    else if (Array.isArray(elementClass))
                        elementClass.forEach(x => elementClasses.push(x))
                }
            })
        return elementClasses;
    }

    private propSubscribes(t:any) {
        if (!this.updating) {
            var props = FunctionParser.parseColumns(String(t));
            props.forEach(x => this.subscribeProps.push(x));
                var indexOf = this.subscribeProps.indexOf("name]");
                if (indexOf != -1)
                    this.subscribeProps[indexOf] = this.config.parameterConfig.name;
        }
    }

    getValue(text: any) {
        if (typeof text == "string" && (text[0] == ":")) {
            text = text.replace(new RegExp(":", "g"), "");
            if (!this.updating)
                this.subscribeProps.push(text);
            if (!this.itemObject)
                this.overrideProp(text);
            return this.objectPropValue(text, this.modelObject);
        }
        if (typeof text == "function") {
            this.propSubscribes(text);
            return text.call(this.modelObject, this.config.parameterConfig);
        }
        return text;
    }

    overrideProp(propName: string) {
        let descriptor = Object.getOwnPropertyDescriptor(this.modelObject, propName);
        let value = descriptor && descriptor.get ? descriptor.get() : this.modelObject[propName];
        let oldValue = null;
        Object.defineProperty(this.modelObject, propName, {
            get: () => { return descriptor && descriptor.get ? descriptor.get.call(this.modelObject) : value },
            set: (v) => {
                if (oldValue != v) {
                    value = v;
                    if (descriptor && descriptor.set)
                        descriptor.set.call(this.modelObject, v);
                    if (this.elementName == "text") {
                        this.element.nodeValue = v;
                        this.bind();
                    }
                    oldValue = v;
                }
            }
        })
    }

    objectPropValue(key: string, valueObject: { [key: string]: any }) {
        let jObject = undefined;
        let splitTexts = key.split('.');
        for (var column of splitTexts) {
            if (!jObject)
                jObject = valueObject;
            if (jObject)
                jObject = jObject[column];
            else
                break;
        }
        return jObject;
    }

    destroy() {
        this.element.parentElement.removeChild(this.element);
    }
}