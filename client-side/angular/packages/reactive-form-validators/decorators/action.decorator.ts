import { ActionConfig } from "../models/config/action-config";
import { defaultContainer } from '../core/defaultContainer';

export function action(config?:ActionConfig[]) {
    return function (
        target: Object
    ) {
        defaultContainer.initAction(target,config)
    } 
}

