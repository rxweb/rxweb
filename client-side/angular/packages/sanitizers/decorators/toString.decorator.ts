import { baseFunction } from "./base.function"
import { BaseConfig } from '../interface/base-config'
export function toString(config?: BaseConfig) {
    return baseFunction('toString', config)
}