import { PropDescriptor } from './prop-descriptor';
import { FILTER, SOURCE } from '../const/app.const';
/**
 * @abstract
 */
export class BaseFormControlConfig extends PropDescriptor {
    /**
     * @param {?} configs
     */
    constructor(configs) {
        super();
        this.configs = configs;
        this._actionResult = {
            label: undefined,
            placeholder: '',
            source: [],
            filter: [],
            hide: false,
            description: undefined,
            disabled: false,
            focus: false,
            readonly: false,
            class: [],
            prependText: ''
        };
    }
    /**
     * @return {?}
     */
    complete() {
        this.controlNotifications = { filter: [], disabled: [], label: [], description: [], hide: [], placeholder: [], readonly: [], focus: [], class: [] };
        for (let /** @type {?} */ action in this.controlNotifications)
            for (let /** @type {?} */ columnName in this.configs) {
                if (!Array.isArray(this.configs[columnName])) {
                    let /** @type {?} */ descriptor = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(this.configs[columnName]), action);
                    if ((descriptor && descriptor.get) || this.configs[columnName].isFilterFunction) {
                        let /** @type {?} */ stringFunction = this.configs[columnName].isFilterFunction ? String(this.configs[columnName][FILTER]) : String(descriptor.get);
                        if (stringFunction.indexOf(`.${this.config.name}`) != -1 || stringFunction.indexOf(`.${this.config.name};`) != -1) {
                            this.controlNotifications[action].push(columnName);
                        }
                    }
                }
            }
        this.overrideProps();
        this.updateActionValue();
    }
    /**
     * @param {?=} actionName
     * @return {?}
     */
    refresh(actionName) {
        for (var /** @type {?} */ columnName in this.controlNotifications) {
            if (this.controlNotifications[columnName].length > 0)
                this.controlNotifications[columnName].forEach(x => {
                    if (x != this.config.name)
                        this.configs[x].refresh(columnName);
                    else
                        this.setActionValue(columnName);
                });
        }
        if (actionName)
            this.setActionValue(actionName);
    }
    /**
     * @param {?} actionName
     * @return {?}
     */
    setActionValue(actionName) {
        if (actionName == FILTER && this.isDefinedFilter) {
            this[FILTER].call(this);
        }
        else
            this[actionName == FILTER ? SOURCE : actionName] = this[actionName];
    }
    /**
     * @return {?}
     */
    updateActionValue() {
        ["disabled", "label", "placeholder", "hide", "description", "focus", "readonly", "class", "filter", "source"].forEach(key => {
            switch (key) {
                case FILTER:
                case SOURCE:
                    if (this.config[key])
                        this[key] = this.config[key];
                    if (this.config.filter) {
                        this[key] = this[FILTER];
                    }
                    if (this.isDefinedFilter && key == FILTER)
                        this[FILTER]();
                    if (key == SOURCE && !this.source)
                        this[key] = [];
                    break;
                default:
                    if (this.config.ui && this.config.ui[key])
                        this[key] = this.config.ui[key];
                    else
                        this[key == FILTER ? SOURCE : key] = this._actionResult[key];
                    break;
            }
        });
    }
}
function BaseFormControlConfig_tsickle_Closure_declarations() {
    /** @type {?} */
    BaseFormControlConfig.prototype.config;
    /** @type {?} */
    BaseFormControlConfig.prototype.source;
    /** @type {?} */
    BaseFormControlConfig.prototype._actionResult;
    /** @type {?} */
    BaseFormControlConfig.prototype.controlNotifications;
    /** @type {?} */
    BaseFormControlConfig.prototype.configs;
}
//# sourceMappingURL=base-form-control-config.js.map