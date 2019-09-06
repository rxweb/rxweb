import { ElementAccessor } from './element-accessor';
import { DynamicNodeConfig } from '../../models/interface/dynamic-node-config';
import { CONDITIONAL_VALIDATOR, BLUR, FOCUS, SELECT, INPUT, CLICK, EVENTS } from '../../const/app.const';
import { ValidatorFn } from '@angular/forms';

export class ElementEventProcessor extends ElementAccessor{
    eventListeners: any[];
    private conditionalValidator: ValidatorFn;
    constructor(public dynamicNodeConfig: DynamicNodeConfig) { super(dynamicNodeConfig); }

    bindEvents(events: { [key: string]: any },isSubscribe:boolean) {
        Object.keys(events).forEach(eventName => {
            switch (eventName) {
                case FOCUS:
                    this.setFocus(this.getValue(events[eventName]));
                    break;
                case SELECT:
                case INPUT:
                    this.setInput();
                    break;
                case BLUR:
                    this.setBlur();
                    break;
                case CLICK:
                    this.setClick(this.getValue(events[eventName]));
                    break;
            }
            if (isSubscribe && this.isSubscribeProp(events[eventName]))
                this.setPropSubscription(this.getPropName(events[eventName]), EVENTS, eventName);
        })
    }

    setClick(functionName:string) {
        this.element.onclick = () => {
            if (this.controlConfig[functionName])
                this.controlConfig[functionName].call(this.controlConfig);
        }
    }

    setFocus(value: boolean) {
        if (value && this.element.focus) 
            setTimeout(t => { this.element.focus()} , 1000);
    }

    setBlur() {
        let listen = this.dynamicNodeConfig.renderer.listen(this.element, BLUR, () => {
            this.dynamicNodeConfig.controlConfig.formControl.markAsTouched();
        })
        this.eventListeners.push(listen);
    }

    setInput() {
        let listen = this.dynamicNodeConfig.renderer.listen(this.element, INPUT, (v) => {
            let isPassed = true;
            if (this.controlConfig.hooks && this.controlConfig.hooks.preValue) {
                isPassed = this.controlConfig.hooks.preValue.call(this.controlConfig,v.target.value);
                if (!isPassed) {
                    this.controlConfig.formControl.patchValue(this.controlConfig.formControl.value);
                    this.resetElementValue(this.controlConfig.formControl.value);
                }
            }
            if (isPassed) {
                this.setControlConfigValue(v.target);
                if (this.controlConfig.hooks && this.controlConfig.hooks.postValue)
                    this.controlConfig.hooks.postValue.call(this.controlConfig);
                this.controlConfig.formControl.markAsDirty();
            }
            if (this.conditionalValidator)
                this.conditionalValidator(this.controlConfig.formControl);
        })
        this.eventListeners.push(listen);
        setTimeout(() => {
            if (this.controlConfig.formControl[CONDITIONAL_VALIDATOR]) {
                this.conditionalValidator = this.controlConfig.formControl[CONDITIONAL_VALIDATOR];
                delete this.controlConfig.formControl[CONDITIONAL_VALIDATOR];
            }
        },50)
        

    }


    
}