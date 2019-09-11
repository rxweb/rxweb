import { baseFunction } from "./base.function"
import { BaseConfig } from '../interface/base-config'
export function toBoolean(strict?: boolean, config?: BaseConfig) {
    return baseFunction('toBoolean', { ...config, ...{ strict: strict } })
}