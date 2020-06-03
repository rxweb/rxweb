import { getInstance } from "../functions/get-instance";
import { DIRECTIVE_MODEL_REFERENCE } from '../const/directive-class-reference'

export function instanceResolver(key: string,params:any) {
    var model = DIRECTIVE_MODEL_REFERENCE[key];
    return getInstance(model, [params])
}