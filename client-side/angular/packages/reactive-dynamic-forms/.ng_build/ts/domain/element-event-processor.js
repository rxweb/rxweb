import { ElementAccessor } from './element-accessor';
import { BLUR, FOCUS, SELECT, INPUT, CLICK, EVENTS } from '../const/app.const';
export class ElementEventProcessor extends ElementAccessor {
    /**
     * @param {?} dynamicNodeConfig
     */
    constructor(dynamicNodeConfig) {
        super(dynamicNodeConfig);
        this.dynamicNodeConfig = dynamicNodeConfig;
    }
    /**
     * @param {?} events
     * @param {?} isSubscribe
     * @return {?}
     */
    bindEvents(events, isSubscribe) {
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
        });
    }
    /**
     * @param {?} functionName
     * @return {?}
     */
    setClick(functionName) {
        this.element.onclick = () => {
            if (this.controlConfig[functionName])
                this.controlConfig[functionName].call(this.controlConfig);
        };
    }
    /**
     * @param {?} value
     * @return {?}
     */
    setFocus(value) {
        if (value && this.element.focus)
            setTimeout(t => { this.element.focus(); }, 1000);
    }
    /**
     * @return {?}
     */
    setBlur() {
        let /** @type {?} */ listen = this.dynamicNodeConfig.renderer.listen(this.element, BLUR, () => {
            this.dynamicNodeConfig.controlConfig.formControl.markAsTouched();
        });
        this.eventListeners.push(listen);
    }
    /**
     * @return {?}
     */
    setInput() {
        let /** @type {?} */ listen = this.dynamicNodeConfig.renderer.listen(this.element, INPUT, (v) => {
            let /** @type {?} */ isPassed = true;
            if (this.controlConfig.hooks && this.controlConfig.hooks.preValue) {
                isPassed = this.controlConfig.hooks.preValue.call(this.controlConfig);
                if (!isPassed)
                    this.controlConfig.formControl.patchValue(this.controlConfig.formControl.value);
            }
            if (isPassed) {
                this.setControlConfigValue(v.target);
                if (this.controlConfig.hooks && this.controlConfig.hooks.postValue)
                    this.controlConfig.hooks.postValue.call(this.controlConfig);
            }
            this.controlConfig.formControl.markAsDirty();
        });
        this.eventListeners.push(listen);
    }
}
function ElementEventProcessor_tsickle_Closure_declarations() {
    /** @type {?} */
    ElementEventProcessor.prototype.eventListeners;
    /** @type {?} */
    ElementEventProcessor.prototype.dynamicNodeConfig;
}
//# sourceMappingURL=element-event-processor.js.map