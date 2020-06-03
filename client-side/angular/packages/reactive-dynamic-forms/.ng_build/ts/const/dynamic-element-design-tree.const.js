const /** @type {?} */ commonAttributes = {
    placeholder: ':placeholder',
    readonly: ':readonly',
    class: ':class',
    name: '{config.name'
};
const /** @type {?} */ commonEvents = {
    focus: ':focus',
    input: 'true',
    blur: 'blur'
};
const /** @type {?} */ checkBoxAndRadioDesign = ['div', [{
            for: {
                source: function (item, index) {
                    return ['div', ['input', [{
                                    attr: Object.assign({ type: '{config.type' }, commonAttributes, { value: item[this.config.valuePropName || 'value'], checked: item[this.config.valuePropName || 'value'] == this.value, disabled: item.disabled ? item.disabled : ':disabled' }),
                                    events: commonEvents,
                                    overrideProp: (index == 0)
                                }],
                            'label', [{ prop: { innerText: item[this.config.valuePropName || 'text'] } }]]];
                }
            }
        }
    ]];
const /** @type {?} */ configUiText = { innerText: '{config.ui.text' };
const /** @type {?} */ classAttribute = { class: ':class', style: { display: ":hide" } };
export const /** @type {?} */ DYNAMIC_ELEMENT_DESIGN_TREE = {
    p: ['p', [{ prop: configUiText, attr: classAttribute }]],
    h1: ['h1', [{ prop: configUiText, attr: classAttribute }]],
    h2: ['h2', [{ prop: configUiText, attr: classAttribute }]],
    h3: ['h3', [{ prop: configUiText, attr: classAttribute }]],
    h4: ['h4', [{ prop: configUiText, attr: classAttribute }]],
    h5: ['h5', [{ prop: configUiText, attr: classAttribute }]],
    h6: ['h6', [{ prop: configUiText, attr: classAttribute }]],
    a: ['a', [{ attr: Object.assign({ href: '{config.href' }, classAttribute), prop: configUiText }]],
    hr: ['hr', [{ attr: commonAttributes }]],
    strong: ['strong', [{ prop: configUiText, attr: classAttribute }]],
    span: ['span', [{ prop: configUiText, attr: classAttribute }]],
    label: ['label', [{ prop: { innerText: ':label' }, attr: Object.assign({ style: { display: ":label" } }, classAttribute) }]],
    small: ['small', [{ prop: { innerText: ':description' }, attr: Object.assign({ style: { display: ":description" } }, classAttribute) }]],
    input: ['input', [{
                attr: Object.assign({ type: '{config.type' }, commonAttributes, { disabled: ':disabled' }),
                events: commonEvents,
            }]],
    error: [`span`, [{ prop: { innerText: ':errorMessage' }, attr: Object.assign({ style: { display: ":errorMessage" } }, commonAttributes) }]],
    div: ['div', [{ attr: classAttribute }]],
    card: ['div', [{ attr: classAttribute }]],
    'card-header': ['div', [{ attr: classAttribute, prop: configUiText }]],
    'card-body': ['div', [{ attr: classAttribute }]],
    buttonGroup: ['div', [{
                for: {
                    source: function (item) {
                        return ['label', [{
                                    attr: Object.assign({ type: '{config.type' }, commonAttributes, { value: item[this.config.valuePropName || 'value'] }),
                                    events: commonEvents
                                }],
                            'label', [{ prop: { innerText: item[this.config.valuePropName || 'text'] } }]];
                    }
                }
            }
        ]
    ],
    'prepend-left': ["div", [
            "div", [
                "div", [{ prop: { innerText: '{config.ui.prependText.left' } }]
            ],
            '[input-text]'
        ]],
    'prepend-right': ["div", [
            '[input-text]',
            "div", [
                "div", [{ prop: { innerText: '{config.ui.prependText.right' } }]
            ],
        ]],
    'prepend-both': ["div", [
            "div", [
                "div", [{ prop: { innerText: '{config.ui.prependText.left' } }]
            ],
            '[input-text]',
            "div", [
                "div", [{ prop: { innerText: '{config.ui.prependText.right' } }]
            ],
        ]],
    textarea: ['textarea', [{ attr: Object.assign({ rows: '{config.ui.rows', cols: '{config.ui.cols' }, commonAttributes), events: commonEvents }]],
    radio: checkBoxAndRadioDesign,
    'checkbox': checkBoxAndRadioDesign,
    select: ['select', [{
                attr: {
                    multiple: '{config.multiselect',
                },
                events: commonEvents,
                source: true
            },
            'option', [{ prop: { innerText: `:placeholder` }, attr: { style: { display: ":placeholder" } } }],
            {
                for: {
                    source: function (item) {
                        return ['option', [
                                {
                                    prop: { innerText: item[this.config.textPropName || 'text'] }, attr: {
                                        value: item[this.config.valuePropName || 'value'],
                                        selected: Array.isArray(this.value) ? this.value.filter(x => item[this.config.valuePropName || 'value'] == x)[0] != undefined : item[this.config.valuePropName || 'value'] == this.value,
                                        disabled: item.disabled
                                    }
                                }
                            ]];
                    }
                }
            }
        ]],
    button: ['button', [{ attr: Object.assign({}, commonAttributes, { name: '{config.name', type: '{config.type' }), events: { click: '{config.events.click' }, prop: { innerText: '{config.ui.text' } }]],
    alert: ['div', [{ attr: commonAttributes }]],
    viewMode: {
        basic: ['div', [{
                    attr: {
                        style: { display: ":hide" }
                    }
                },
                '[label]',
                '[control]',
                '[error]',
                '[small]'
            ]],
        horizontal: ['div', [{
                    attr: {
                        style: { display: ":hide" }
                    }
                },
                '[label]',
                'div', ['[control]', '[error]', '[small]']
            ]],
        advance: ['div', [
                'div', [{
                        attr: {
                            style: { display: ":hide" }
                        }
                    },
                    '[label]', '[control]', '[error]', '[small]']
            ]]
    }
};
//# sourceMappingURL=dynamic-element-design-tree.const.js.map