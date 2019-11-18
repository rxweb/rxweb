import { overrideAttribute } from './override-method'
import { ElementBinder } from '../interface/element-binder';
import { DIRECTIVE_MODEL_REFERENCE } from '../const/directive-class-reference';

export function bootstrapRxWebFramework(template: { [key: string]: any }) {
    Object.keys(template).forEach(t => {
        DIRECTIVE_MODEL_REFERENCE[t] = template[t];
    })
    overrideAttribute();
}
