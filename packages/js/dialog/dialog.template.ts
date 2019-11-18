import { TemplateConfig } from "@rxweb/dom"
import { DialogClass } from "./dialog-class-config";
import { DialogViewMode } from "./dialog-view-mode";

export function getDefaultTemplate(dialogClass: DialogClass): TemplateConfig {
    return {
        div: {
            class: dialogClass.root,
            style: dialogClass.rootStyle,
            childrens: [{
                h2: {
                    class: dialogClass.heading, childrens: [{ text: { text: ":text.heading" } }]
                },
                p: { class: dialogClass.paragraph, childrens: [{ text: { text: ":text.message" } }] }
            },
            {
                div: {
                    class: dialogClass.nestedDiv,
                    childrens: [{
                        button: {
                            if: function () { return this.viewMode == DialogViewMode.onlyOk || this.viewMode == DialogViewMode.okWithCancel },
                            class: dialogClass.button.ok,
                            event: { onclick: 'ok' },
                            childrens: [{ text: { text: ":text.ok" } }]
                        }
                    },
                    {
                        button: {
                            if: function () { return this.viewMode == DialogViewMode.saveAndDontSave },
                            event: { onclick: 'save' },
                            class: dialogClass.button.save, childrens: [{ text: { text: ":text.save" } }]
                        }
                    },
                    {
                        button: {
                            if: function () { return this.viewMode == DialogViewMode.saveAndDontSave },
                            event: { onclick: 'dontsave' },
                            class: dialogClass.button.dontSave, childrens: [{ text: { text: ":text.dontsave" } }]
                        }
                    },
                    {
                        button: {
                            if: function () { return this.viewMode == DialogViewMode.okWithCancel || this.viewMode == DialogViewMode.saveAndDontSave },
                            event: { onclick: 'cancel' },
                            class: dialogClass.button.cancel, childrens: [{ text: { text: ":text.cancel" } }]
                        }
                    },
                    ]
                }
            }
            ]
        }
    }
        ;
}
