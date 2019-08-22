import { SOURCE, SELECT, ADDITIONAL_CLASS, PROP, ATTR, EVENTS, INPUT, TEXTAREA, READONLY } from '../../const/app.const';
import { ControlState } from '../../statics/control-state';
import { OverrideObjectProp } from "./override-object-prop";
import { DynamicNodeConfig } from "../../models/interface/dynamic-node-config";

export class DomManipulation extends OverrideObjectProp {
    isComponentView: boolean = false;
    subscribers: string[] = [];
    elementIndex: number = 0;
    commentNode: any;
    nodeName: string;
    domConfig: { [key: string]: any };
    element: any;
    eventListeners: any[] = [];
    controlId: number;
    private actionListeners: { [key: string]: any } = {};
    private elementClasses: any[] = [];

    constructor(parentNode: any, elementName: string, dynamicNodeConfig: DynamicNodeConfig) {
        super(dynamicNodeConfig);
        this.nodeName = elementName;
        super.createNodeElement(parentNode, elementName);
        this.bindAdditionalClasses();
        this.controlId = ControlState.controlId = ControlState.controlId + 1;
        ControlState.controls[this.controlId] = this;
        this.addOrRemoveAttribute("data-rxwebid", this.controlId,false);
    }

    parseObject(jObject: { [key: string]: any }, isSubscribe: boolean) {
        this.domConfig = jObject;
        this.process(jObject, isSubscribe)
        this.overrideProp(isSubscribe);
        this.subscribeValueChange();
    }

    private subscribeValueChange() {
        if (Object.keys(this.subscribeProps).length > 0)
            this.controlConfig.onPropValueChanged(this.controlId, this.subscribeProps, (x, y) => {
                this.process(x, false)
            })
    }
    process(jObject: { [key: string]: any }, isSubscribe: boolean) {
        Object.keys(jObject).forEach(propName => {
            switch (propName) {
                case PROP:
                    this.bindProp(jObject[propName], isSubscribe);
                    break;
                case ATTR:
                    this.bindAttribute(jObject[propName], isSubscribe);
                    break;
                case EVENTS:
                    this.bindEvents(jObject[propName], isSubscribe);
                    break;
                case SOURCE:
                    if (!isSubscribe) {
                        while (this.element.firstElementChild)
                            this.removeChildren(this.element.firstElementChild);
                        this.dynamicNodeConfig.controlConfigProcessor.createChildrens(this.dynamicNodeConfig.collections, this, this.controlConfig, this.dynamicNodeConfig.additionalClasses, false);
                    } else
                        this.setPropSubscription(SOURCE, SOURCE, SOURCE);
                    break;
            }
        })
    }
    overrideProp(isSubscribe: boolean) {
        switch (this.nodeName) {
            case INPUT:
            case SELECT:
            case TEXTAREA:
                if (this.domConfig.overrideProp == undefined || this.domConfig.overrideProp)
                    this.overrideValueProp();
                this.setPropSubscription(READONLY, ATTR, ADDITIONAL_CLASS, ADDITIONAL_CLASS)
                if (this.controlConfig && this.controlConfig.config && this.controlConfig.config.additionalConfig) 
                    this.process(this.controlConfig.config.additionalConfig, isSubscribe);
                break;
        }
    }


    bindAdditionalClasses() {
        let additionalClasses = this.dynamicNodeConfig.additionalClasses;
        if (additionalClasses && additionalClasses.class) {
            this.setClass(additionalClasses.class, ADDITIONAL_CLASS);
            if (additionalClasses.listenerProps)
                additionalClasses.listenerProps.forEach(t => this.setPropSubscription(t, ATTR, ADDITIONAL_CLASS, ADDITIONAL_CLASS))
        }
    }

    destroy() {
        let eventCount = this.eventListeners.length;
        for (var i = 0; i < eventCount; i++) {
            this.eventListeners[0]();
            this.eventListeners.splice(0, 1);
        }
        this.eventListeners = [];
        this.element.onClick = null;
        if (this.componentView)
            this.componentView.destroy();
        else
            this.element.parentElement.removeChild(this.element)
        this.controlConfig.destroy(this.controlId);
    }
}

