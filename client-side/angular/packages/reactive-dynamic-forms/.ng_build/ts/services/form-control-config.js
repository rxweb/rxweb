import { BaseFormControlConfig } from './base-form-control-config';
/**
 * @abstract
 */
export class FormControlConfig extends BaseFormControlConfig {
    /**
     * @param {?} fieldConfig
     * @param {?} controlsConfig
     */
    constructor(fieldConfig, controlsConfig) {
        super(controlsConfig);
        this.controlsConfig = controlsConfig;
        this.config = fieldConfig;
        this.value = fieldConfig.value;
        super.checkFilterFunction();
        this.props = Object.create({});
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set formControl(value) {
        this._formControl = value;
        setTimeout(() => this.overrideErrorsProp(this._formControl), 10);
    }
    /**
     * @return {?}
     */
    get formControl() {
        return this._formControl;
    }
    /**
     * @return {?}
     */
    get errorMessage() {
        return this.formControl.errorMessage;
    }
    /**
     * @return {?}
     */
    get prependText() {
        return this.config.ui ? this.config.ui.prependText : '';
    }
}
function FormControlConfig_tsickle_Closure_declarations() {
    /** @type {?} */
    FormControlConfig.prototype._formControl;
    /** @type {?} */
    FormControlConfig.prototype.inputs;
    /** @type {?} */
    FormControlConfig.prototype.events;
    /** @type {?} */
    FormControlConfig.prototype.value;
    /** @type {?} */
    FormControlConfig.prototype.disabled;
    /** @type {?} */
    FormControlConfig.prototype.label;
    /** @type {?} */
    FormControlConfig.prototype.placeholder;
    /** @type {?} */
    FormControlConfig.prototype.hide;
    /** @type {?} */
    FormControlConfig.prototype.description;
    /** @type {?} */
    FormControlConfig.prototype.focus;
    /** @type {?} */
    FormControlConfig.prototype.readonly;
    /** @type {?} */
    FormControlConfig.prototype.class;
    /** @type {?} */
    FormControlConfig.prototype.isPlainTextMode;
    /** @type {?} */
    FormControlConfig.prototype.validator;
    /** @type {?} */
    FormControlConfig.prototype.asyncValidator;
    /** @type {?} */
    FormControlConfig.prototype.hooks;
    /** @type {?} */
    FormControlConfig.prototype.controlsConfig;
}
export class ControlConfig extends FormControlConfig {
    /**
     * @param {?} fieldConfig
     * @param {?} controlsConfig
     */
    constructor(fieldConfig, controlsConfig) {
        super(fieldConfig, controlsConfig);
    }
}
//# sourceMappingURL=form-control-config.js.map