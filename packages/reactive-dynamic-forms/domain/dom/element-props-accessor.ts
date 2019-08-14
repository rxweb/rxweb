import { ElementEventProcessor } from './element-event-processor';
import { DynamicNodeConfig } from '../../models/interface/dynamic-node-config';
import { ADDITIONAL_CLASS, BOOLEAN, NONE, BLANK, DISPLAY, FUNCTION, STRING, ATTR, PROP, CLASS, STYLE } from '../../const/app.const';

export abstract class ElementPropsAccessor extends ElementEventProcessor {
    private oldAdditionalClasses: string[] = [];
    private oldClasses: string[] = [];
    constructor(dynamicNodeConfig: DynamicNodeConfig) { super(dynamicNodeConfig); }


    bindAttribute(attr: { [key: string]: any }, isSubscribe: boolean) {
        Object.keys(attr).forEach(attributeName => {
            let value = (attributeName !== STYLE) ? this.getValue(attr[attributeName]) : attr[attributeName];
            switch (attributeName) {
                case ADDITIONAL_CLASS:
                case CLASS:
                    this.setClass(value, attributeName);
                    break;
                case STYLE:
                    Object.keys(attr[attributeName]).forEach(x => {
                        let value = this.getValue(attr[attributeName][x]);
                        this.setStyleProp(x, value);
                        if (isSubscribe && this.isSubscribeProp(attr[attributeName][x]))
                            this.setPropSubscription(attr[attributeName][x], ATTR, x, '', STYLE)
                    })
                    break;
                default:
                    this.addOrRemoveAttribute(attributeName, value);
                    break;
            }
            if (isSubscribe && attributeName !== STYLE && this.isSubscribeProp(attr[attributeName]))
                this.setPropSubscription(attr[attributeName], ATTR, attributeName);
        })

    }

    bindProp(prop: { [key: string]: any }, isSubscribe: boolean) {
        Object.keys(prop).forEach(propName => {
            let value = this.getValue(prop[propName]);
            if (value)
                this.setProperty(propName, value)
            if (isSubscribe && this.isSubscribeProp(prop[propName]))
                this.setPropSubscription(prop[propName], PROP, propName);
        });
    }

    setClass(classes: any[], type: string) {
        classes = this.getClassNames(type == ADDITIONAL_CLASS ? this.dynamicNodeConfig.additionalClasses.class : classes);
        type == ADDITIONAL_CLASS ? this.addOrRemoveClasses(this.oldAdditionalClasses, false) : this.addOrRemoveClasses(this.oldClasses, false);
        this.addOrRemoveClasses(classes);
        switch (type) {
            case ADDITIONAL_CLASS:
                this.oldAdditionalClasses = classes;
                break;
            case CLASS:
                this.oldClasses = classes;
                break;
        }
    }

    setStyleProp(propName: string, value: any) {
        switch (propName) {
            case DISPLAY:
                value = (typeof value == BOOLEAN) ? value : !(value);
                value = (value) ? NONE : BLANK;
                break;
        }
        this.addOrRemoveStyle(propName, value);
    }

    setProperty(propertyName: string, value: any) {
        this.dynamicNodeConfig.renderer.setProperty(this.element, propertyName, value);
    }

    addOrRemoveClasses(classes: any[], isAdd: boolean = true) {

        if (isAdd)
            classes.forEach(t => this.dynamicNodeConfig.renderer.addClass(this.element, t));
        else
            classes.forEach(t => this.dynamicNodeConfig.renderer.removeClass(this.element, t));
    }


    addOrRemoveStyle(styleName: string, value: any) {
        if (value)
            this.dynamicNodeConfig.renderer.setStyle(this.element, styleName, value);
        else
            this.dynamicNodeConfig.renderer.removeStyle(this.element, styleName);
    }

    addOrRemoveAttribute(attributeName: string, value: any) {
        if (value)
            this.dynamicNodeConfig.renderer.setAttribute(this.element, attributeName, value);
        else
            this.dynamicNodeConfig.renderer.removeAttribute(this.element, attributeName);
    }

    private getClassNames(classes: any[]) {
        let elementClasses = [];
        if (classes)
            classes.forEach(t => {
                if (typeof t == STRING)
                    elementClasses.push(t);
                else if (typeof t == FUNCTION) {
                    let elementClass = t.call(this.controlConfig);
                    if (elementClass && !Array.isArray(elementClass))
                        elementClasses.push(elementClass)
                    else if (Array.isArray(elementClass))
                        elementClass.forEach(x => elementClasses.push(x))
                }
            })
        return elementClasses;
    }
}