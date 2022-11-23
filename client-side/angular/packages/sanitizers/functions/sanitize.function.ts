import { SANITIZERS } from '../const/sanitizers.const'
import { executeExpression } from './execute-expression.function';

export function sanitize(sanitizers: any,value:any,target:any) {
    let parsedValue = value;
    Object.keys(sanitizers).forEach(sanitizerName => {
        let config = sanitizers[sanitizerName];
        parsedValue = executeExpression(config,target) ? SANITIZERS[sanitizerName](value, config) : value;
    })
    return parsedValue;
}