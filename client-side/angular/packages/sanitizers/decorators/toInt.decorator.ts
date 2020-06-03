import { baseFunction } from "./base.function"
import { BaseConfig } from '../interface/base-config'
export function toInt(radix?: number, config?: BaseConfig) {
    return baseFunction('toInt', { ...config, ...{ radix: radix } })
}