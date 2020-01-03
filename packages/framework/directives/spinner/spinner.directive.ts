import { TemplateConfig, DomManipulation } from '@rxweb/dom'
import { SpinnerDesignClass } from './models/spinner-design-class';
import { ElementDomProvider } from '../../core/element-dom-provider';
import { ElementBinder } from '../../interface/element-binder'


export class SpinnerDirective extends ElementDomProvider implements ElementBinder {
    private element: HTMLElement;
    designClass: SpinnerDesignClass;
    private domManipulation: DomManipulation;

    inClass: string[];

    constructor(element:any) {
        super();
        this.element = element;
        this.designClass = new SpinnerDesignClass();
    }

    getTemplate(): TemplateConfig {
        return {
            div: {
                class: this.designClass.root,
                childrens: [
                    {
                        div: { class: [this.designClass.childrens[0]] }
                    },
                    {
                        div: { class: [this.designClass.childrens[1]] }
                    },
                    {
                        div: { class:[ this.designClass.childrens[2]] }
                    },
                    {
                        div: { class:[ this.designClass.childrens[3] ]}
                    },
                    {
                        div: { class: [this.designClass.childrens[4]] }
                    }
                ]
            }
        }
    }

    bind() {
        var template = this.getTemplate();
        this.domManipulation = this.createElement(this.element, "div", template.div, {}, 0, {});
        if (this.inClass)
            this.inClass.forEach(t => {
                this.element.classList.add(t);
            })
            
    }

    valueChange(value: any) {
        if (value)
            this.bind();
        else
            this.remove();
    }

    remove() {
        if (this.domManipulation && this.domManipulation.element) {
            if (this.inClass)
                this.inClass.forEach(t => {
                    this.element.classList.remove(t);
                })
                
            this.removeChildren(this.domManipulation.element);
        }
    }

    destroy() {
        if (this.domManipulation && this.domManipulation.element)
        this.removeChildren(this.domManipulation.element);
    }
}