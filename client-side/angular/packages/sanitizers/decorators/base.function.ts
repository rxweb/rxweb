import { sanitizerContainer} from '../core/sanitizerContainer';
export function baseFunction(sanitizerType:string,config?:any) {
    return function (
        target: Object,
        propertyName: string
    ) {
        sanitizerContainer.register(target, propertyName, sanitizerType, config || true)
    } 
}
