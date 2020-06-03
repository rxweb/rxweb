import { baseFunction } from "./base.function"
import { BaseConfig } from '../interface/base-config'
export function toFloat(config?: BaseConfig) {
    return baseFunction('toFloat', config)
}