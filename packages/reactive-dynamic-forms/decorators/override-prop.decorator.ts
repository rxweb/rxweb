import { dynamicContainer } from '../core/dynamicContainer';
import { OverrideConfigProp } from "../models/interface/override-config-prop"

export function overrideProps(props:{[key:string]:OverrideConfigProp}) {
    return function (
        target: Object
    ) {
        dynamicContainer.registerOverrideProp(props)
    } 
}

