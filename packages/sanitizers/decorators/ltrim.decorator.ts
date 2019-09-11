import { baseFunction } from "./base.function"
import { BaseConfig } from '../interface/base-config'
export function ltrim(config?: BaseConfig) {
    return baseFunction('ltrim', config)
}