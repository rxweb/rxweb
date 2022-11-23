import { FILE, RANGE, CHECKBOX, RADIO, BLANK } from './app.const';
export const /** @type {?} */ BOOSTRAP_CLASS_CONFIG = {
    defaultControl: 'form-control',
    fileControl: 'form-control-file',
    readOnlyPlainText: 'form-control-plaintext',
    rangeControl: 'form-control-range',
    checkBoxAndRadioControl: 'form-check-input',
    checkboxAndRadioControlInline: 'form-check-inline',
    controlValid: 'is-valid',
    controlInvalid: 'is-invalid',
    validMessage: 'valid-feedback',
    invalidMessage: 'invalid-feedback',
};
const /** @type {?} */ PREPEND_TEXT_CLASS_PATH = {
    class: ['input-group-prepend'],
    child: {
        0: { class: ['input-group-text'] }
    }
};
const /** @type {?} */ INPUT_GROUP = ['input-group'];
export const /** @type {?} */ BOOTSTRAP_DESIGN_CONFIG = {
    elementClassPath: {
        "prepend-left": {
            class: INPUT_GROUP,
            child: PREPEND_TEXT_CLASS_PATH
        },
        "prepend-right": {
            class: INPUT_GROUP,
            child: PREPEND_TEXT_CLASS_PATH
        },
        "prepend-both": {
            class: INPUT_GROUP,
            child: {
                0: PREPEND_TEXT_CLASS_PATH,
                2: PREPEND_TEXT_CLASS_PATH
            }
        },
        input: { class: [inputElementClassProvider, function () { let /** @type {?} */ invalidClass = (this.formControl.validator && this.formControl.errorMessage) ? BOOSTRAP_CLASS_CONFIG.controlInvalid : ''; return invalidClass; }], listenerProps: [":errorMessage"] },
        checkbox: {
            class: [], child: {
                0: {
                    class: ['form-check', inLineRadioAndCheckbox],
                    child: { 0: { class: ['form-check-input'] }, 1: { class: ['form-check-label'] } }
                }
            }
        },
        radio: {
            class: [], child: {
                0: {
                    class: ['form-check', inLineRadioAndCheckbox],
                    child: { 0: { class: ['form-check-input'] }, 1: { class: ['form-check-label'] } }
                }
            }
        },
        'error': { class: [function () { return !(this.formControl.validator && this.formControl.errorMessage) ? BOOSTRAP_CLASS_CONFIG.validMessage : BOOSTRAP_CLASS_CONFIG.invalidMessage; }], listenerProps: [":errorMessage"] },
        button: { class: ['btn'] },
        alert: { class: ['alert'] },
        card: { class: ['card'] },
        'card-header': { class: ['card-header'] },
        'card-body': { class: ['card-body'] },
        viewMode: {
            basic: { class: ['form-group'] },
            horizontal: {
                class: ['form-group', 'row'],
                child: {
                    0: { class: [function () { return this.config.ui && this.config.ui.viewMode && this.config.ui.viewMode.horizontal && this.config.ui.viewMode.horizontal.label ? this.config.ui.viewMode.horizontal.label : ''; }] },
                    1: {
                        class: [function () { return this.config.ui && this.config.ui.viewMode && this.config.ui.viewMode.horizontal && this.config.ui.viewMode.horizontal.div ? this.config.ui.viewMode.horizontal.div : ''; }],
                    }
                }
            },
            advance: {
                class: ['form-row', function () { return this.config && this.config.ui && this.config.ui.viewMode && this.config.ui.viewMode.advance && this.config.ui.viewMode.advance.root_div ? this.config.ui.viewMode.advance.root_div : ''; }],
                child: {
                    0: {
                        class: ['form-group', function () { return this.config && this.config.ui && this.config.ui.viewMode && this.config.ui.viewMode.advance && this.config.ui.viewMode.advance.div ? this.config.ui.viewMode.advance.div : ''; }],
                        child: {
                            0: { class: [function () { return this.config && this.config.ui && this.config.ui.viewMode && this.config.ui.viewMode.advance && this.config.ui.viewMode.advance.label ? this.config.ui.viewMode.advance.label : ''; }] },
                            2: { class: [function () { return this.config && this.config.ui && this.config.ui.viewMode && this.config.ui.viewMode.advance && this.config.ui.viewMode.advance.error ? this.config.ui.viewMode.advance.error : ''; }] },
                            3: { class: [function () { return this.config.ui && this.config.ui.viewMode && this.config.ui.viewMode.advance && this.config.ui.viewMode.advance.small ? this.config.ui.viewMode.advance.small : ''; }] }
                        }
                    }
                }
            }
        },
        small: { class: ['form-text'] },
        textarea: { class: [BOOSTRAP_CLASS_CONFIG.defaultControl] },
        select: { class: [BOOSTRAP_CLASS_CONFIG.defaultControl] }
    }
};
/**
 * @return {?}
 */
function inputElementClassProvider() {
    let /** @type {?} */ elementClass = '';
    if (!this.readonly || (this.readonly && !this.isPlainTextMode))
        switch (this.config.type) {
            case FILE:
                elementClass = BOOSTRAP_CLASS_CONFIG.fileControl;
                break;
            case RANGE:
                elementClass = BOOSTRAP_CLASS_CONFIG.rangeControl;
                break;
            case RADIO:
            case CHECKBOX:
                elementClass = BLANK;
                break;
            default:
                elementClass = BOOSTRAP_CLASS_CONFIG.defaultControl;
                break;
        }
    else if (this.readonly && this.isPlainTextMode)
        elementClass = BOOSTRAP_CLASS_CONFIG.readOnlyPlainText;
    return elementClass;
}
/**
 * @return {?}
 */
function inLineRadioAndCheckbox() {
    return this.config && this.config.inline ? ['form-check-inline'] : [];
}
//# sourceMappingURL=bootstrap-design-config.const.js.map