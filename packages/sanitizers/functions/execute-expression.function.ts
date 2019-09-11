import { BaseConfig } from "../interface/base-config";

export function executeExpression(config: BaseConfig, target:any) {
    return config.expression ? config.expression.call(target) : true;
}