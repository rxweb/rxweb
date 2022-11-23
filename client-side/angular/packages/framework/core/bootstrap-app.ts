import { overrideAttribute } from './override-method'
import { DIRECTIVE_MODEL_REFERENCE } from '../const/directive-class-reference';
import { BootstrapConfig } from '../interface/config/bootstrap-config';
import { frameworkContainer } from "./frameworkContainer"
export function bootstrapRxWebFramework(bootstrap: BootstrapConfig) {
    Object.keys(bootstrap.template).forEach(t => {
        DIRECTIVE_MODEL_REFERENCE[t] = bootstrap.template[t];
    })
    if (bootstrap.decorators)
        frameworkContainer.setAuthorizeAndMultilingualDecorator(bootstrap.decorators);
    overrideAttribute();
}
