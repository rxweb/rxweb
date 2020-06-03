
const commonAttributes = {
    placeholder: ':placeholder',
    readonly: ':readonly',
    class: ':class',
    name: '{config.name'
};
const commonEvents = {
    focus: ':focus',
    input: 'true',
    blur: 'blur'
};



const checkBoxAndRadioDesign = ['div', [{ source: true }, {
    for: {
        source: function (item, index) {
            return ['div', ['input', [{
                attr: {
                    type: '{config.type', ...commonAttributes, value: item[this.config.valuePropName || 'value'], checked: item[this.config.valuePropName || 'value'] == this.value,
                    disabled: item.disabled ? item.disabled : ':disabled'

                },
                events: commonEvents,
                overrideProp: (index == 0)
            }],
                'label', [{ prop: { innerText: item[this.config.textPropName || 'text'] } }]]]
        }
    }
}

]];

const configUiText = { innerText: ':props.text' };
const classAttribute = { class: ':class', style: { display: ":hide" } };

export const DYNAMIC_ELEMENT_DESIGN_TREE: { [key: string]: any } = {

    p: ['p', [{ prop: configUiText, attr: classAttribute }]],

    h1: ['h1', [{ prop: configUiText, attr: classAttribute }]],

    h2: ['h2', [{ prop: configUiText, attr: classAttribute }]],

    h3: ['h3', [{ prop: configUiText, attr: classAttribute }]],

    h4: ['h4', [{ prop: configUiText, attr: classAttribute }]],

    h5: ['h5', [{ prop: configUiText, attr: classAttribute }]],

    h6: ['h6', [{ prop: configUiText, attr: classAttribute }]],

    a: ['a', [{ attr: { href: '{config.href', ...classAttribute, }, prop: configUiText }]],

    hr: ['hr', [{ attr: commonAttributes }]],

    strong: ['strong', [{ prop: configUiText, attr: classAttribute }]],

    span: ['span', [{ prop: configUiText, attr: classAttribute }]],

    img: ['img', [{ prop: { src: ':img' }, attr: { style: { display: ":img" }, ...classAttribute } }]],

    label: ['label', [{ prop: { innerText: ':label' }, attr: { style: { display: ":label" }, ...classAttribute } }]],

    small: ['small', [{ prop: { innerText: ':description' }, attr: { style: { display: ":description" }, ...classAttribute } }]],

    input: ['input', [{
        attr: { type: '{config.type', ...commonAttributes, disabled: ':disabled' },
        events: commonEvents,
    }]],

    error: [`span`, [{ prop: { innerText: ':errorMessage' }, attr: { style: { display: ":errorMessage" }, ...commonAttributes } }]],

    div: ['div', [{ attr: classAttribute }]],

    card: ['div', [{ attr: classAttribute }]],

    'card-header': ['div', [{ attr: classAttribute, prop: configUiText }]],

    'card-body': ['div', [{ attr: classAttribute }]],

    buttonGroup: ['div', [{
        for: {
            source: function (item) {
                return ['label', [{
                    attr: {
                        type: '{config.type', ...commonAttributes, value: item[this.config.valuePropName || 'value']
                    },
                    events: commonEvents
                }],
                    'label', [{ prop: { innerText: item[this.config.textPropName || 'text'] } }]]
            }
        }
    }

    ]
    ],

    'prepend-left': ["div", [
        "div", [
            "div", [{ prop: { innerText: '{config.ui.prependText.left' } }]],
        '[input-text]'
    ]],

    'prepend-right': ["div", [
        '[input-text]',
        "div", [
            "div", [{ prop: { innerText: '{config.ui.prependText.right' } }]],
    ]],

    'prepend-both': ["div", [
        "div", [
            "div", [{ prop: { innerText: '{config.ui.prependText.left' } }]],
        '[input-text]',
        "div", [
            "div", [{ prop: { innerText: '{config.ui.prependText.right' } }]],
    ]],


    textarea: ['textarea', [{ attr: { ...{ rows: '{config.ui.rows', cols: '{config.ui.cols' }, ...commonAttributes }, events: commonEvents }]],

    radio: checkBoxAndRadioDesign,

    'checkbox': checkBoxAndRadioDesign,

    select: ['select', [{
        attr: {
            multiple: '{config.multiselect',
        },
        events: commonEvents,
        source: true
    },
        'option', [{ prop: { innerText: `:placeholder` }, attr: { value: '', style: { display: ":placeholder" } } }],
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

    button: ['button', [{ attr: { ...commonAttributes, name: '{config.name', type: '{config.type' }, events: { click: '{config.events.click' }, prop: { innerText: ':props.text' } }]],

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
        inline: [],

        advance: ['div', [
            'div', [{
                attr: {
                    style: { display: ":hide" }
                }
            },
                '[img]', '[label]', '[control]', '[error]', '[small]']
        ]]
    }
}

