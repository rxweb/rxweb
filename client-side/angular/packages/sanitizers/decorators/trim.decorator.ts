import { baseFunction } from "./base.function"
import { BaseConfig } from '../interface/base-config'
export function trim(config?: BaseConfig) {
    return baseFunction('trim', config)
}