import { baseFunction } from "./base.function"
import { BaseConfig } from '../interface/base-config'
export function lowerCase(config?:BaseConfig) {
    return baseFunction("lowercase",config)
}